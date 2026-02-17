FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json .
COPY apps/web/package.json ./apps/web/package.json
COPY packages/database/package.json ./packages/database/package.json
COPY packages/ai-services/package.json ./packages/ai-services/package.json
COPY packages/video-engine/package.json ./packages/video-engine/package.json
COPY packages/youtube-service/package.json ./packages/youtube-service/package.json
COPY packages/shared/package.json ./packages/shared/package.json
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm", "run", "start"]
