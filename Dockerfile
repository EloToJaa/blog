FROM node:18-alpine

WORKDIR /app

COPY / /app

RUN npm ci

EXPOSE 3000

CMD ["node", "index.js"]