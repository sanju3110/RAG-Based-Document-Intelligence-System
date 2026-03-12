import * as dotenv from "dotenv";
dotenv.config();

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";

async function indexDocument() {
  try {
    console.log("📄 Reading PDF...");

    const loader = new PDFLoader("./jobdetails.pdf", {
      parsedItemSeparator: "\n",
      splitPages: false,
    });

    const pages = await loader.load();
    const totalPagesToRead = Math.min(14, pages.length); // up to 14 pages

    let pagesToProcess = pages.slice(0, totalPagesToRead); // first 14 pages

    console.log(`✅ PDF has ${pages.length} pages. Processing first ${totalPagesToRead} pages.`);

    // ------------------------------
    // CHUNKING
    // ------------------------------
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunks = await splitter.splitDocuments(pagesToProcess);
    console.log("✂️ Chunking Complete. Total Chunks:", chunks.length);

    // ------------------------------
    // EMBEDDINGS
    // ------------------------------
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      model: "text-embedding-004",
    });

    console.log("🤖 Google Embeddings Ready");

    // ------------------------------
    // PINECONE INIT
    // ------------------------------
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    const index = pc.index(process.env.PINECONE_INDEX_NAME);
    console.log("🌲 Pinecone Connected");

    // ------------------------------
    // UPSERT
    // ------------------------------
    const vectors = [];

    for (let i = 0; i < chunks.length; i++) {
      const embedding = await embeddings.embedQuery(chunks[i].pageContent);

      vectors.push({
        id: `page_${i}`,
        values: embedding,
        metadata: { text: chunks[i].pageContent }
      });
    }

    await index.upsert(vectors);
    console.log("🎉 First 14 Pages Successfully Uploaded to Pinecone!");

  } catch (err) {
    console.error("❌ ERROR while indexing:", err);
  }
}

indexDocument();
