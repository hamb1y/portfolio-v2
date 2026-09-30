.PHONY: dev build check commit deploy

.ONESHELL:

dev:
	bun dev --host "0.0.0.0"

check:
	bun run check

build:
	bun run build

# usage: make commit MSG="message"
commit:
	git add -A
	git commit -m "$(MSG)"

deploy: check build commit
	wrangler pages deploy ./dist
