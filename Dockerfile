FROM node:18-alpine

WORKDIR /app

ARG NODE_ENV=production

COPY / /app

RUN npm ci

EXPOSE 3000

CMD ["node", "index.js"]