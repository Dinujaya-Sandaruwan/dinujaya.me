FROM node:20.10.0-slim

WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@latest --activate
RUN pnpm --version

COPY package*.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

EXPOSE 5173

CMD pnpm run dev