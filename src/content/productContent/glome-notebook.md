---
title: Glome Notebook
description: A study and research notebook that answers questions and generates useful outputs from your own sources.
technologies:
  - SvelteKit
  - Svelte 5
  - TypeScript
  - FastAPI
  - PostgreSQL
  - pgvector
  - Celery
  - DeepSeek
  - PaddleOCR-VL
  - Nomic Embed
  - Kokoro TTS
  - Docker
link: https://bookdemo.rishimalnad.dev
---

> Glome Notebook is in active development. The goal is a practical, source-grounded workspace for studying, research, and document-heavy work.

# 1. What is Glome Notebook?

Glome Notebook is a study and research notebook built around your own source material. You upload PDFs, scanned handouts, DOCX files, spreadsheets, images, pasted notes, web pages, and source links. Glome extracts the useful text, indexes it, and lets you ask questions that are grounded in the notebook instead of relying on a generic model response.

The core workflow is simple: create a notebook, add sources, ask questions, then turn the same source base into useful outputs like flashcards, quizzes, flowcharts, reports, article drafts, study prompts, and audio overviews.

# 2. Why I built it

Most AI chat tools are good at answering broad questions, but they are weak when the answer needs to come from a specific pile of notes, scans, PDFs, and messy files. Glome is built for the cases where the source matters: exam prep, research synthesis, document review, and writing from material you have already collected.

The system keeps document ingestion, extraction, embeddings, OCR, TTS, and vector search inside the product stack. The external model dependency for text generation is DeepSeek.

# 3. How it works

The frontend is a SvelteKit 2 app using Svelte 5, TypeScript, Tailwind CSS 4, and shadcn-svelte components. It handles the landing page, authentication screens, notebook lists, source management, chat, generated outputs, and settings.

The backend is FastAPI with SQLAlchemy, Alembic migrations, PostgreSQL, pgvector, and Celery. PostgreSQL stores users, notebooks, sources, chunks, embeddings, chat messages, and generated artifacts. Celery handles longer-running work like ingestion and generation jobs.

Source ingestion goes through a structured pipeline:

- Extract text from PDFs, office documents, spreadsheets, text files, URLs, and YouTube transcripts.
- OCR scanned pages and images with PaddleOCR-VL through a separate model service.
- Chunk extracted text with paragraph-aware splitting so tables and related sentences stay together.
- Embed chunks with `nomic-ai/nomic-embed-text-v2-moe`.
- Store vectors and metadata in PostgreSQL with pgvector.

# 4. RAG and generation architecture

Glome uses retrieval-augmented generation instead of dumping everything into the prompt. For direct questions, it embeds the query, retrieves the most relevant chunks, and asks DeepSeek to answer from that context.

For broader synthesis tasks, it can use a map-reduce strategy across sources. That is useful when the user asks for a report, article, comparison, or generated study material that needs coverage across the whole notebook.

The system also uses a cheap routing step to decide whether a query should use top-k retrieval or map-reduce. Static prompts are kept stable so DeepSeek prefix caching can reduce token cost.

# 5. Supported outputs

Glome is not just a chat box. The same notebook can produce:

- Grounded answers
- Flashcards
- Quizzes
- Flowcharts
- Reports
- Article drafts
- Audio overviews
- Study prompts

The generation formats are designed to render directly in the frontend. For some structured outputs, Glome uses constrained HTML instead of JSON because it is more token-efficient and maps cleanly to styled UI.

# 6. Current architecture

The production shape is split into clear services:

- **Frontend:** SvelteKit app.
- **Backend:** FastAPI API and product logic.
- **Database:** PostgreSQL with pgvector.
- **Worker:** Celery for async ingestion and generation.
- **Model service:** separate GPU service for OCR, embeddings, and TTS.
- **LLM:** DeepSeek API for routing, chat, and generation.

This keeps the main backend focused on product state and orchestration while GPU-heavy work runs separately.

# 7. What makes it interesting

The interesting part is not one individual feature. It is the full pipeline: messy source ingestion, extraction, vector search, query routing, grounded chat, and generated study artifacts in one notebook-style product.

It is the kind of app where backend architecture and frontend workflow have to fit together tightly. If ingestion is slow, vague, or unreliable, the chat is worse. If the chat state diverges from the server, the user loses trust. If generation output is hard to parse, the product feels unfinished. Glome is built around making those pieces work as one system.
