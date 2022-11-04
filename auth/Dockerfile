FROM node:lts-alpine AS build

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml package.json ./

RUN pnpm fetch

ADD . ./

RUN pnpm install -r --offline

# RUN pnpm start:build

# ## Run App
# FROM node:alpine

# WORKDIR /app

# RUN npm install -g pnpm

# COPY package.json .

# RUN pnpm install -P

# COPY --from=build /app/.build ./src

EXPOSE  3031

# CMD pnpm start
CMD pnpm start:dev
