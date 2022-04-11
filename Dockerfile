# syntax=docker/dockerfile:1

FROM node:16.14.2
ENV NODE_ENV=production
ENV DATABASE_URL="file:./db/prod.db"

WORKDIR /app
COPY . .
RUN npm install --production

EXPOSE 8111

RUN npx prisma migrate deploy
ENTRYPOINT [ "npm", "run", "start" ]