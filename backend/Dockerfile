# syntax=docker/dockerfile:1

## Build
FROM golang:1.19-alpine as build

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .

RUN go build -o main main.go

## Deploy
FROM alpine

WORKDIR /app

COPY --from=build /app/main /app/main

EXPOSE $APP_PORT

CMD ["./main", "server"]