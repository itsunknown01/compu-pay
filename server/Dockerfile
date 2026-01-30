# Build Stage
FROM node:18-alpine AS builder
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./
# If pnpm-lock.yaml doesn't exist in server context, it will generate one, or we can copy from root if building from root context.
# For truly separate deployment where we push just the server folder, we rely on package.json.
RUN pnpm install --frozen-lockfile --prefer-offline || pnpm install

COPY prisma ./prisma/
RUN pnpm exec prisma generate

COPY . .
RUN pnpm run build

# Production Stage
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile --prefer-offline || pnpm install --prod

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Generate Prisma Client for production
RUN pnpm exec prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
