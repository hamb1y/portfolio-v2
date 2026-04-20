.PHONY: dev build deploy

.ONESHELL:

dev:
	bun dev --host "0.0.0.0"

build:
	bun run build

commit:
	git add -A
	git commit -m "$MSG"

deploy: build commit
	bun run build
	wrangler pages deploy ./dist
