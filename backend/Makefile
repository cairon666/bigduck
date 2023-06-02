BINARY_NAME := main
MAIN_PACKAGE_PATH := ./cmd/server.go

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

## golangci-lint-check: check golangci-lint and install if not exist
.PHONY: golangci-lint-check
golangci-lint-check:
	bash ./scripts/golangci-lint-check.sh

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
audit: golangci-lint-check
	go mod verify
	golangci-lint run ./... --fix
	CC=gcc CGO_ENABLED=1 go test -race -buildvcs -vet=off ./...

# ==================================================================================== #
# DEVELOPMENT
# ==================================================================================== #

## test: run all tests
.PHONY: test
test:
	CC=gcc CGO_ENABLED=1 go test -v -race -buildvcs ./...

## build: build the application
.PHONY: build
build:
    # Include additional build steps, like TypeScript, SCSS or Tailwind compilation here...
	go build -o=/tmp/bin/${BINARY_NAME} ${MAIN_PACKAGE_PATH}

## run: run the  application
.PHONY: run
run: build
	/tmp/bin/${BINARY_NAME}

## run/live: run the application with reloading on file changes
.PHONY: run/live
run/live:
	go run github.com/cosmtrek/air@v1.43.0 \
		--build.cmd "make build" --build.bin "/tmp/bin/${BINARY_NAME}" --build.delay "100" \
		--build.exclude_dir "" \
		--build.include_ext "go, tpl, tmpl, html, css, scss, js, ts, sql, jpeg, jpg, gif, png, bmp, svg, webp, ico" \
		--misc.clean_on_exit "true"

# ==================================================================================== #
# OPERATIONS
# ==================================================================================== #

# push: push changes to the remote Git repository
.PHONY: push
push: tidy audit no-dirty
	git push

### production/deploy: deploy the application to production
#.PHONY: production/deploy
#production/deploy: confirm tidy audit no-dirty
#	GOOS=linux GOARCH=amd64 go build -ldflags='-s' -o=/tmp/bin/linux_amd64/${BINARY_NAME} ${MAIN_PACKAGE_PATH}
#	upx -5 /tmp/bin/linux_amd64/${BINARY_NAME}
#    # Include additional deployment steps here...


#generate:
#	go generate ./...
#
#dependence:
#	go get .; \
#	go install github.com/vektra/mockery/v2@v2.20.0
