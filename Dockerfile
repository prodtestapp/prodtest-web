FROM node:14.18.1-alpine as builder

COPY . /app

WORKDIR /app

RUN yarn build:prod

FROM node:14.18.1-alpine

WORKDIR /app

COPY --from=builder /app  .

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
