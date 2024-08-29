# Build
FROM node:20 AS build

COPY /src /app/src
COPY package*.json /app
COPY tsconfig*.json /app

WORKDIR /app

RUN npm install

RUN npm run build

# Prod
FROM node:20 AS production

COPY /prisma /app/prisma
COPY package*.json /app
COPY .env /app/.env

WORKDIR /app

RUN npm ci --omit=dev

COPY --from=build /app/build ./build

EXPOSE 3333

CMD ["npm", "run", "start"]