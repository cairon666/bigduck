#!/bin/make
include .env
export

APP_NAME := main
APP_PACKAGE_PATH := ./cmd/app/...

MIGRATIONS_NAME := migrations
MIGRATIONS_PACKAGE_PATH := ./cmd/migrations/...

# ==================================================================================== #
# HELPERS
# ==================================================================================== #

## help: print help message
.PHONY: help
help:
	@echo 'Usage:'
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'

.PHONY: confirm
confirm:
	@echo -n 'Are you sure? [y/N]' && read ans && [ $${ans:-N} = y ]

.PHONY: no-dirty
no-dirty:
	git diff --exit-code

## install: install dependency for project(run script into ./scripts/install)
.PHONY: install
install:
	/bin/sh ./scripts/install


# ==================================================================================== #
# QUALITY CONTROL
# ==================================================================================== #

## tidy: format code and tidy modfile
.PHONY: tidy
tidy:
	go fmt ./...
	go mod tidy -v
	go run github.com/daixiang0/gci@latest write ./

## audit: run quality control checks
.PHONY: audit
audit:
	go mod verify
	golangci-lint run ./...
	CC=gcc CGO_ENABLED=1 go test -race -buildvcs -vet=off ./...

# ==================================================================================== #
# DEVELOPMENT
# ==================================================================================== #

## test: run all tests
.PHONY: test
test:
	CC=gcc CGO_ENABLED=1 go test -v -race -buildvcs ./...

## build: build the application bin
.PHONY: build
build:
	go build -o=/tmp/bin/${APP_NAME} ${APP_PACKAGE_PATH}

# build: build the migrations bin
.PHONY: build/migrations
build/migrations:
	go build -o=/tmp/bin/${MIGRATIONS_NAME} ${MIGRATIONS_PACKAGE_PATH}

## run: run the application
.PHONY: run
run: build build/migrations
	/tmp/bin/${MIGRATIONS_NAME} ${POSTGRESQL_URL} ./migrations/sql
	/tmp/bin/${APP_NAME}

# ==================================================================================== #
# OPERATIONS
# ==================================================================================== #

# push: push changes to the remote Git repository
.PHONY: push
push: no-dirty
	git push

### production/deploy: deploy the application to production
#.PHONY: production/deploy
#production/deploy: confirm tidy audit no-dirty
#	GOOS=linux GOARCH=amd64 go build -ldflags='-s' -o=/tmp/bin/linux_amd64/${BINARY_NAME} ${MAIN_PACKAGE_PATH}
#	upx -5 /tmp/bin/linux_amd64/${BINARY_NAME}
#    # Include additional deployment steps here...
