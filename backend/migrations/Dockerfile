FROM golang:1.20-alpine as builder

WORKDIR /build

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o /bin/main ./cmd/migrations/main.go

###
FROM alpine:3

COPY --from=builder /bin/main /bin/main

COPY --from=builder /build/migrations/sql /migrations

ENTRYPOINT ["/bin/main"]