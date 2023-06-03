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

## audit: run quality control checks
.PHONY: audit
audit:
	npx prettier ./src --check;
	npx eslint ./src --fix;

## audit/fix: run quality control checks !WITH FIX!
.PHONY: audit/fix
audit/fix:
	npx prettier ./src --check --write;
	npx eslint ./src --fix;

## preview: preview
.PHONY: preview
preview:
	npx vite preview;

# ==================================================================================== #
# DEVELOPMENT
# ==================================================================================== #

## storybook: run storybook server
.PHONY: storybook
storybook:
	npx storybook dev --config-dir .storybook;

## run/dev: run server with dev
.PHONY: run/dev
dev:
	export NODE_ENV development;
	vite serve --config vite.config.ts;

.PHONY: build
build:
	export NODE_ENV production;
	vite build;

# ==================================================================================== #
# OPERATIONS
# ==================================================================================== #

# push: push changes to the remote Git repository
.PHONY: push
push: audit no-dirty
	git push