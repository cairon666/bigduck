# syntax=docker/dockerfile:1

## Build
FROM golang:1.20-alpine as build

WORKDIR /app

# install make
RUN apk add --no-cache make

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .

RUN make build
RUN make build/migrations

## Deploy
FROM alpine

COPY --from=build /tmp/bin/main /tmp/bin/main

COPY --from=build /app/migrations /tmp/migrations
COPY --from=build /tmp/bin/migrations /tmp/bin/migrations

EXPOSE $APP_PORT

CMD ["/bin/sh", "-c", "/tmp/bin/migrations $POSTGRESQL_URL /tmp/migrations/sql; /tmp/bin/main"]