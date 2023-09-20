FROM node:20.7.0-alpine AS build

WORKDIR /app

COPY . .

RUN npm ci --omit=dev

FROM node:20.7.0-alpine

WORKDIR /app

COPY --from=build /app /app

# switch to user node (uid=1000)
USER node

ENTRYPOINT ["node", "src/index.mjs"]
