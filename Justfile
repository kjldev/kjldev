# Show available tasks
default:
    @just --list

# Run the Astro dev server
run:
    cd src && npm run dev

# Type-check the Astro project
check:
    cd src && npm run check

# Install dependencies for all packages
install-deps:
    npm install
    cd src && npm install

# Update all dependencies
update-deps:
    cd src && npx @astrojs/upgrade
    npm update
    cd src && npm update

# Lint markdown files
lint-md:
    npx --no-install markdownlint-cli2 "src/**/*.md"

# Auto-fix markdown lint issues where possible
lint-md-fix:
    npx --no-install markdownlint-cli2 --fix "src/**/*.md"

# Release a new version
release:
    npm run release
