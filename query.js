import * as dotenv from "dotenv";
dotenv.config();

import readlineSync from "readline-sync";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pinecone } from "@pinecone-database/pinecone";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function ask(question) {
  try {
    console.log("\n🔎 Generating embedding...");

    const embedder = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "text-embedding-004",
    });

    const queryVector = await embedder.embedQuery(question);

    console.log("📡 Querying Pinecone...");

    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    const index = pc.index(process.env.PINECONE_INDEX_NAME);

    const search = await index.query({
      vector: queryVector,
      topK: 5,
      includeMetadata: true,
    });

    const context = search.matches
      .map((m) => m.metadata.text)
      .join("\n\n----------------\n\n");

    const prompt = `
You are an assistant that answers ONLY from the provided context.
If answer not found, respond exactly:
"I could not find the answer in the provided document."

CONTEXT:
${context}

QUESTION: ${question}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const answer = result.response.text();

    console.log("\n💬 Answer:");
    console.log(answer);

  } catch (err) {
    console.error("❌ ERROR:", err);
  }
}

async function main() {
  const q = readlineSync.question("Ask me anything: ");
  await ask(q);
  main();
}

main();
