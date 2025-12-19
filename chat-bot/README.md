# Chat Bot - RAG-based News Assistant

A Retrieval Augmented Generation (RAG) chatbot that answers questions based on news articles ingested from RSS feeds. The application uses vector embeddings stored in Qdrant for semantic search and Google Gemini for generating contextual responses.

## Features

- 🤖 **RAG-based Chat**: Ask questions and get answers based on ingested news articles
- 📰 **RSS Feed Ingestion**: Automatically fetch and process news articles from RSS feeds
- 🔍 **Semantic Search**: Vector-based retrieval using Qdrant for finding relevant context
- 💾 **Interaction Logging**: Track all chat interactions with response times
- ⚡ **Background Jobs**: Use Inngest for scheduled news ingestion
- 🐳 **Docker Support**: Containerized setup for easy deployment

## Tech Stack

- **Runtime**: [Bun](https://bun.sh) - Fast JavaScript runtime
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (via Prisma ORM)
- **Vector Database**: Qdrant
- **LLM**: Google Gemini
- **Embeddings**: OpenAI
- **Background Jobs**: Inngest
- **RSS Parsing**: rss-parser

## Prerequisites

- [Bun](https://bun.sh) (v1.3.1 or higher)
- Docker and Docker Compose (for Qdrant)
- PostgreSQL database
- Google Gemini API key
- OpenAI API key (for embeddings)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chat-bot
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/chatbot?schema=public"

# Qdrant
QDRANT_URL="http://localhost:6333"
QDRANT_COLLECTION="news_vectors"

# OpenAI (for embeddings)
OPENAI_API_KEY="your-openai-api-key"

# Google Gemini
GEMINI_API_KEY="your-gemini-api-key"

# Server
PORT=5000

# Inngest (optional, for background jobs)
INNGEST_EVENT_KEY="your-inngest-event-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"
```

4. Set up Qdrant vector database:
```bash
docker-compose -f qdrant.docker-compose.yml up -d
```

5. Set up PostgreSQL database and run migrations:
```bash
# Generate Prisma client
bunx prisma generate

# Run migrations
bunx prisma migrate dev
```

## Running the Application

### Development Mode

Start the server with hot reload:
```bash
bun run dev
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

### Production Mode

Start the server:
```bash
bun run start
```

### Running Inngest Dev Server (for background jobs)

In a separate terminal, run:
```bash
bun run inggest
```

This starts the Inngest dev server for testing background jobs locally.

## API Endpoints

### Chat

**POST** `/api/chat`
- Send a query and receive an AI-generated answer based on news articles
- Request body:
  ```json
  {
    "query": "What are the latest news about technology?"
  }
  ```
- Response:
  ```json
  {
    "answer": "Based on the latest news...",
    "responseTimeMs": 1234
  }
  ```

### Training/Ingestion

**POST** `/api/tranning`
- Trigger news ingestion from RSS feeds
- This endpoint triggers the Inngest function to fetch and ingest news articles

## Architecture

### Flow Overview

1. **News Ingestion**:
   - RSS feeds are fetched periodically via Inngest
   - Articles are chunked and converted to embeddings
   - Embeddings are stored in Qdrant vector database

2. **Chat Flow**:
   - User query is converted to an embedding
   - Similar articles are retrieved from Qdrant using vector search
   - Retrieved context is passed to Gemini LLM
   - Response is generated and logged to PostgreSQL

### Project Structure

```
chat-bot/
├── src/
│   ├── app.ts                 # Express app setup
│   ├── server.ts              # Server entry point
│   ├── config/                # Configuration files
│   │   ├── prismaClient.ts    # Prisma client setup
│   │   ├── qdrant.ts          # Qdrant client
│   │   ├── qdrant-init.ts     # Qdrant initialization
│   │   └── news-url.ts        # RSS feed URLs
│   ├── controllers/           # Request handlers
│   │   ├── chat.controller.ts
│   │   └── inngest.controller.ts
│   ├── services/              # Business logic
│   │   ├── chat.service.ts
│   │   ├── embedding.service.ts
│   │   ├── gemini.service.ts
│   │   ├── retrieval.service.ts
│   │   ├── rss-parser.service.ts
│   │   └── vector-ingestion.service.ts
│   ├── route/                 # API routes
│   │   ├── chat.route.ts
│   │   └── inggest.route.ts
│   ├── inngest/               # Background job functions
│   │   └── index.ts
│   ├── types/                 # TypeScript types
│   │   └── news.ts
│   └── utils/                 # Utility functions
│       └── chunkText.ts
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── qdrant_data/               # Qdrant data storage
├── Dockerfile                 # Docker configuration
├── docker-compose.yml         # Docker Compose config
├── qdrant.docker-compose.yml  # Qdrant Docker setup
└── package.json
```

## Docker Deployment

### Build and Run with Docker

1. Build the Docker image:
```bash
docker build -t chat-bot .
```

2. Run with Docker Compose (ensure you have a `docker-compose.yml` configured):
```bash
docker-compose up -d
```

## Database Schema

The application uses PostgreSQL with the following main model:

- **Interaction**: Stores chat interactions
  - `id`: Primary key
  - `sessionId`: Unique session identifier
  - `userQuery`: User's question
  - `llmResponse`: AI-generated response
  - `responseTimeMs`: Response time in milliseconds
  - `createdAt`: Timestamp

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `QDRANT_URL` | Qdrant server URL | Yes |
| `QDRANT_COLLECTION` | Qdrant collection name | No (default: "news_vectors") |
| `OPENAI_API_KEY` | OpenAI API key for embeddings | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `PORT` | Server port | No (default: 5000) |
| `INNGEST_EVENT_KEY` | Inngest event key | Optional |
| `INNGEST_SIGNING_KEY` | Inngest signing key | Optional |

## Development

### Running Migrations

```bash
# Create a new migration
bunx prisma migrate dev --name migration_name

# Apply migrations
bunx prisma migrate deploy
```

### Generating Prisma Client

```bash
bunx prisma generate
```

## License

This project is private and proprietary.

## Contributing

This is a private project. For questions or issues, please contact the project maintainers.
