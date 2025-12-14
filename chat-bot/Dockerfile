FROM oven/bun:1.1

WORKDIR /app

COPY bun.lockb package.json tsconfig.json ./
RUN bun install

COPY src ./src
COPY prisma ./prisma

RUN bunx prisma generate

CMD ["bun", "src/server.ts"]
