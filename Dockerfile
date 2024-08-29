# Build
FROM node:lts AS build

COPY /prisma /app/prisma
COPY /src /app/src
COPY jest.config.js /app
COPY package*.json /app
COPY tsconfig*.json /app

WORKDIR /app

RUN npm install

RUN npm run build

# Prod
FROM node:lts AS production

WORKDIR /app

COPY /prisma /app/prisma
COPY package*.json /app

RUN npm ci --omit=dev

COPY --from=build /app/build ./build

EXPOSE 3333

CMD ["npm", "run", "start"]