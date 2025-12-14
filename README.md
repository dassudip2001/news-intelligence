# News Intelligence Platform

A full-stack news intelligence application that fetches news articles from RSS feeds, stores them in a vector database, and provides an AI-powered chat interface to query and retrieve relevant news information using semantic search and Google Gemini AI.

## 🏗️ Architecture

This project consists of two main components:

- **chat-bot** - Backend API server built with Bun, Express, and TypeScript
- **chat-client** - Frontend web application built with Next.js and React

### How It Works

1. **News Ingestion**: RSS feeds are periodically fetched (every 55 minutes) using Inngest scheduled jobs
2. **Vector Storage**: News articles are processed, chunked, and stored as embeddings in Qdrant vector database
3. **Semantic Search**: User queries are converted to embeddings and used to find relevant articles
4. **AI Responses**: Google Gemini AI generates contextual answers based on retrieved articles

## 🚀 Tech Stack

### Backend (chat-bot)
- **Runtime**: [Bun](https://bun.sh) - Fast JavaScript runtime
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Vector Database**: Qdrant
- **AI**: Google Gemini 2.0 Flash
- **Task Scheduling**: Inngest
- **Other**: RSS Parser, Axios, CORS, Helmet, Morgan

### Frontend (chat-client)
- **Framework**: Next.js 16
- **UI**: React 19, Tailwind CSS
- **Language**: TypeScript

## 📁 Project Structure

```
.
├── chat-bot/              # Backend API server
│   ├── src/
│   │   ├── config/        # Configuration files (Qdrant, news URLs)
│   │   ├── controllers/   # Route controllers
│   │   ├── services/      # Business logic (chat, embedding, retrieval, etc.)
│   │   ├── route/         # API routes
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utility functions
│   │   ├── inngest/       # Inngest scheduled functions
│   │   ├── app.ts         # Express app setup
│   │   └── server.ts      # Server entry point
│   ├── prisma/            # Database schema and migrations
│   ├── docker-compose.yml # Docker services configuration
│   └── package.json
│
└── chat-client/           # Frontend web application
    ├── app/               # Next.js app directory
    ├── public/            # Static assets
    └── package.json
```

## 🛠️ Setup Instructions

### Prerequisites

- [Bun](https://bun.sh) installed (v1.3.1+)
- [Node.js](https://nodejs.org/) installed (for frontend)
- PostgreSQL database
- Qdrant vector database (can be run via Docker)
- Google Gemini API key

### Backend Setup (chat-bot)

1. Navigate to the backend directory:
```bash
cd chat-bot
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and configure:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/news_intelligence"

# Qdrant
QDRANT_URL="http://localhost:6333"
QDRANT_COLLECTION="news_vectors"

# Google Gemini
GEMINI_API_KEY="your-gemini-api-key"

# Server
PORT=5000

# Inngest (if using cloud)
INNGEST_EVENT_KEY="your-inngest-event-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"
```

4. Set up the database:
```bash
bunx prisma migrate dev
bunx prisma generate
```

5. Start Qdrant (if using Docker):
```bash
docker-compose -f qdrant.docker-compose.yml up -d
```

6. Run the backend server:
```bash
# Development mode (with watch)
bun run dev

# Production mode
bun run start
```

The API server will run on `http://localhost:5000`

### Frontend Setup (chat-client)

1. Navigate to the frontend directory:
```bash
cd chat-client
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
bun dev
```

The frontend will run on `http://localhost:3000`

### Using Docker

You can also run the entire stack using Docker:

```bash
cd chat-bot
docker-compose up -d
```

## 📡 API Endpoints

### POST /api/chat

Send a query to get AI-generated answers based on news articles.

**Request:**
```json
{
  "query": "What are the latest developments in technology?"
}
```

**Response:**
```json
{
  "answer": "Based on the latest news articles...",
  "responseTimeMs": 1234
}
```

## 🔄 Scheduled Jobs

The application uses Inngest to run scheduled tasks:

- **News Fetching**: Runs every 55 minutes
  - Fetches news from RSS feeds (currently BBC News)
  - Processes and chunks articles
  - Generates embeddings
  - Stores in Qdrant vector database

## 🔑 Environment Variables

### Backend (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `QDRANT_URL` | Qdrant server URL | Yes |
| `QDRANT_COLLECTION` | Vector collection name | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `PORT` | Server port | No (default: 5000) |
| `INNGEST_EVENT_KEY` | Inngest event key | Optional |
| `INNGEST_SIGNING_KEY` | Inngest signing key | Optional |

## 📊 Database Schema

### Interaction Model

Stores chat interactions and responses:

- `id`: Unique identifier
- `sessionId`: User session identifier
- `userQuery`: User's question
- `llmResponse`: AI-generated response
- `responseTimeMs`: Response time in milliseconds
- `createdAt`: Timestamp

## 🔍 Features

- ✅ RSS feed parsing and ingestion
- ✅ Semantic search using vector embeddings
- ✅ AI-powered question answering with Google Gemini
- ✅ Scheduled news updates via Inngest
- ✅ RESTful API for chat interactions
- ✅ Modern Next.js frontend
- ✅ PostgreSQL for data persistence
- ✅ Qdrant for vector similarity search

## 🧪 Development

### Running in Development Mode

**Backend:**
```bash
cd chat-bot
bun run dev  # Runs with watch mode
```

**Frontend:**
```bash
cd chat-client
npm run dev  # Runs Next.js dev server
```

### Database Migrations

```bash
cd chat-bot
bunx prisma migrate dev    # Create a new migration
bunx prisma generate       # Generate Prisma Client
bunx prisma studio         # Open Prisma Studio GUI
```

## 📝 License

This project is private.

## 🤝 Contributing

This is a private project. For contributions, please contact the repository owner.

---

Built with ❤️ using Bun, Next.js, and Google Gemini AI

