FROM oven/bun:1.1

WORKDIR /app

COPY bun.lock package.json tsconfig.json ./
RUN bun install

COPY src ./src
COPY prisma ./prisma

RUN bunx prisma generate

CMD ["bun", "src/server.ts"]
FROM node:20-slim
RUN npm install -g bun

WORKDIR /app

COPY bun.lock package.json tsconfig.json ./
RUN bun install
COPY prisma ./prisma
COPY src ./src
RUN bunx prisma generate
CMD ["bun", "src/server.ts"]