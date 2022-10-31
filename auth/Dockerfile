FROM node:alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json .

RUN pnpm install

COPY . .

EXPOSE 3031

CMD pnpm start:dev