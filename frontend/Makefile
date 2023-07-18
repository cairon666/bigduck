# ==================================================================================== #
# HELPERS
# ==================================================================================== #

## help: print help message
.PHONY: help
help:
	@echo 'Usage:'
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'

.PHONY: no-dirty
no-dirty:
	git diff --exit-code

# ==================================================================================== #
# QUALITY CONTROL
# ==================================================================================== #

## audit/fix: run quality control checks !WITH FIX!
.PHONY: tidy
tidy:
	npx prettier ./src --check --write;
	npx eslint ./src --fix;

## audit: run quality control checks
.PHONY: audit
audit:
	npx prettier ./src --check;
	npx eslint ./src;

## preview: preview
.PHONY: preview
preview:
	npx vite preview;

## preview: preview
.PHONY: install
install:
	npm install -g pnpm;
	pnpm i;

# ==================================================================================== #
# DEVELOPMENT
# ==================================================================================== #

## storybook: run storybook server
.PHONY: run/storybook
run/storybook:
	npx storybook dev --config-dir storybook;

## run/dev: run server with dev
.PHONY: run/dev
run/dev:
	NODE_ENV=development npx vite serve --config vite.config.ts;

.PHONY: build
build:
	export NODE_ENV production;
	npx vite build;

# ==================================================================================== #
# OPERATIONS
# ==================================================================================== #

# push: push changes to the remote Git repository
.PHONY: push
push: audit no-dirty
	git push