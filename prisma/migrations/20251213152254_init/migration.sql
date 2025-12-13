-- CreateTable
CREATE TABLE "Interaction" (
    "id" SERIAL NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userQuery" TEXT NOT NULL,
    "llmResponse" TEXT NOT NULL,
    "responseTimeMs" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);
