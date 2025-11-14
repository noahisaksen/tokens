.PHONY: install build dev clean help

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	bun install

build: ## Build the JavaScript bundle
	bun build src.js --outfile=bundle.js --target=browser

dev: build ## Build and start the development server
	bun run server.ts

clean: ## Remove built files
	rm -f bundle.js client.js

rebuild: clean build ## Clean and rebuild the bundle
