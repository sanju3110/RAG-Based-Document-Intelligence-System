# 📄 RAG-Based-Document-Search-System
📌 Project Overview
This project implements a Retrieval-Augmented Generation (RAG) system that allows users to ask questions about the content of a PDF document. The system processes a PDF file, converts it into vector embeddings, stores them in a vector database, and retrieves the most relevant information to generate accurate answers using an AI model.

The goal of this project is to demonstrate practical knowledge of software engineering principles, AI integration, and modern backend development practices using Node.js, LangChain, Pinecone, and Google Gemini.

This project also reflects the responsibilities expected from an Associate Software Engineer, including software design, development, debugging, and continuous improvement of technical solutions.

🏗 System Architecture

The system follows the Retrieval-Augmented Generation (RAG) architecture, which works in two main phases:

1️⃣ Indexing Phase (Data Ingestion)

In this phase, the PDF document is processed and stored in the vector database.

Steps performed:

Load the PDF document.

Extract text from all pages.

Split the text into smaller chunks.

Convert chunks into vector embeddings using Google Gemini.

Store embeddings in Pinecone vector database.

This allows the system to efficiently retrieve relevant information when a user asks a question.

2️⃣ Query Phase (Question Answering)

In this phase, the user interacts with the system by asking questions.

Steps performed:

User enters a query in the terminal.

Query is transformed into a vector embedding.

Pinecone searches for the most relevant text chunks.

Retrieved context is passed to the Gemini model.

Gemini generates an answer based on the retrieved content.

The system ensures that answers are generated only from the document context, improving reliability.

⚙️ Tech Stack

Node.js – Backend runtime

LangChain – AI workflow orchestration

Google Gemini API – Embedding and response generation

Pinecone – Vector database

PDF Loader (LangChain) – Extract text from PDF

dotenv – Environment variable management

readline-sync – CLI user interaction

📂 Project Structure
jobdetails_rag/
│
├── index.js          # Indexing pipeline (PDF → embeddings → Pinecone)
├── query.js          # Query pipeline (user question → answer)
├── jobdetails.pdf    # Source document
├── .env              # API keys and environment variables
├── package.json      # Project configuration
└── README.md         # Project documentation
🔧 Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/yourusername/jobdetails_rag.git
cd jobdetails_rag
2️⃣ Initialize Node Project
npm init -y

Update package.json:

{
  "type": "module"
}
3️⃣ Install Dependencies
npm install @langchain/pinecone @langchain/core @pinecone-database/pinecone \
@langchain/community @google/genai @langchain/google-genai \
@langchain/textsplitters dotenv pdf-parse readline-sync --legacy-peer-deps

If pdf-parse causes errors:

npm uninstall pdf-parse --legacy-peer-deps
npm install pdf-parse@1.1.1 --legacy-peer-deps
🔑 Environment Variables

Create a .env file:

GEMINI_API_KEY=your_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=us-east-1
PINECONE_INDEX_NAME=reloit
🚀 Running the Project
Step 1 — Index the PDF

This loads the PDF, splits it into chunks, generates embeddings, and stores them in Pinecone.

node index.js

Expected output:

PDF loaded
Chunking Completed
Embedding model configured
Pinecone configured
Data Stored successfully
Step 2 — Ask Questions

Run:

node query.js

Example:

Ask me anything --> What is Binary Search?

The system will retrieve relevant content from the PDF and generate an answer.

✨ Key Features

✔ PDF document ingestion
✔ Intelligent document chunking
✔ Vector embedding generation
✔ Semantic search using Pinecone
✔ Context-based AI responses
✔ Chat history handling
✔ Query rewriting for better retrieval

📚 Learning Outcomes

Through this project, I gained experience in:

Implementing Retrieval-Augmented Generation (RAG)

Working with vector databases

Integrating AI APIs into real applications

Designing modular backend systems

Managing environment variables and dependencies

Debugging and troubleshooting Node.js projects

🔮 Future Improvements
Add a web-based UI interface
Support multiple documents
Implement conversation memory
Add document upload functionality
Improve retrieval accuracy

📖 References
1) LangChain Documentation
2) LangChain Documentation
3) Pinecone Vector Database Documentation
4) Google Gemini API Documentation
5) You tube tutorial

Pinecone Vector Database Documentation

Google Gemini API Documentation
