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

## Deploy
FROM alpine

COPY --from=build /tmp/bin/main /tmp/bin/main

EXPOSE $APP_PORT

CMD ["/tmp/bin/main"]