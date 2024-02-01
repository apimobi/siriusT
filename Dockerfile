FROM node:lts-bullseye-slim as base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY ./ .
CMD ["yarn", "dev"]

