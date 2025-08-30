# Copilot Instructions for KJL Dev Project

## Project Overview

This is an Astro-based static site generator project using TypeScript, Preact, and modern tooling. The project follows strict type safety and code quality standards with a focus on performance and developer experience.

## Technology Stack & Tooling

### Core Technologies

- **Astro**: Static site generator with component-based architecture
- **TypeScript**: Strict mode enabled, prefer explicit typing
- **Preact**: Use functional components with hooks for client-side interactivity
- **Bun**: Runtime and package manager, ES modules preferred
- **Package Manager**: Use Bun (bun.lockb present)

## Critical Bun & Astro Rules

### Bun Commands Only

- Use Bun exclusively: `bun run`, `bun test`, `bun install`, `bun add`, `bun remove`
- Never use `node`, `npm`, `yarn`, `pnpm` commands
- Use `bun --filter` for workspace operations: `bun --filter="./src/packages/*" run build`
- Leverage Bun's built-in test runner (no Jest, Vitest, or other test frameworks)
- Use Bun's native TypeScript support (no ts-node or similar)

### Common Astro Commands

- **Development**: `bun dev` or `bun start` - Start Astro dev server
- **Build**: `bun build` - Build static site for production
- **Preview**: `bun preview` - Preview production build locally
- **Type Check**: `bun astro check` - Run Astro's built-in type checker
- **Generate Types**: `bun astro sync` - Generate TypeScript definitions

### Build & Development Tools

- **Astro**: Static site generator with component islands architecture
- **Vite**: Underlying build tool (managed by Astro)
- **ESLint**: Code linting with strict rules
- **Prettier**: Code formatting (check .prettierrc for config)
- **TypeScript**: Strict configuration in tsconfig.json

### Testing

- Follow existing test patterns if tests are present
- Prefer unit tests for utilities, integration tests for components

## Code Style & Standards

### TypeScript Guidelines

- Use strict mode settings from tsconfig.json
- Prefer explicit return types for functions
- Use proper type annotations, avoid `any`
- Leverage union types and type guards
- Use interfaces for object shapes, types for unions/primitives

### Preact Guidelines

- Use functional components with hooks
- Prefer arrow functions for components
- Use proper TypeScript typing for props and state
- Follow React best practices for performance (useMemo, useCallback when needed)
- Use proper dependency arrays in useEffect

### File Organization

- **Astro Pages**: `/src/pages/` - File-based routing, supports .astro, .md, .mdx, .html files
- **Astro Components**: `/src/components/` - Reusable .astro components
- **Astro Layouts**: `/src/layouts/` - Page layout components
- **Client Components**: `/src/components/` - Preact components for client-side interactivity
- **Assets**: `/src/assets/` - Images, fonts, and other static assets
- **Styles**: `/src/styles/` - CSS, SCSS, or style files
- **Utilities**: `/src/lib/` or `/src/utils/` - Shared TypeScript utilities
- **Content**: `/src/content/` - Markdown content with collections (if using content collections)
- **Public**: `/public/` - Static assets served directly
- Follow the existing directory structure
- Group related files together
- Use index files for clean imports
- Prefer named exports over default exports for utilities

## Astro-Specific Guidelines

### Component Types

- **Astro Components (.astro)**: For static content, server-side rendering, and layouts
- **Client Components (Preact)**: Use `client:*` directives for interactivity
- **Hybrid Components**: Astro components that import and use client components

### Client Directives

- `client:load` - Hydrate immediately on page load
- `client:idle` - Hydrate when main thread is idle
- `client:visible` - Hydrate when component enters viewport
- `client:media` - Hydrate when media query matches
- `client:only` - Skip server rendering, only run on client

### Content Collections (if used)

- Define schemas in `src/content/config.ts`
- Use `getCollection()` and `getEntry()` for content queries
- Leverage TypeScript types generated from schemas

### Code Quality

- Follow ESLint rules strictly
- Use Prettier for consistent formatting
- Write self-documenting code with clear variable names
- Add JSDoc comments for complex functions
- Prefer composition over inheritance

## Development Workflow

### Dependencies

- Check package.json for existing dependencies before adding new ones
- Use exact versions for critical dependencies
- Keep dependencies up to date but test thoroughly

### Environment

- Use environment variables for configuration
- Follow existing patterns for env variable usage
- Keep sensitive data out of the codebase

### Git & Commits

- Write clear, descriptive commit messages
- Follow conventional commit format if established
- Keep commits focused and atomic

## Specific Preferences

### Import/Export Style

- Use ES6 import/export syntax
- Organize imports: external libraries first, then internal modules
- Use absolute imports if configured in tsconfig paths

### Error Handling

- Use proper error boundaries in React
- Implement comprehensive error handling in async operations
- Prefer specific error types over generic Error

### Performance Considerations

- Consider bundle size when adding dependencies
- Use code splitting for large components/features
- Optimize re-renders with proper memoization

### Accessibility

- Follow WCAG guidelines
- Use semantic HTML elements
- Include proper ARIA attributes when needed
- Ensure keyboard navigation works

## Files to Reference

- `tsconfig.json` - TypeScript configuration
- `astro.config.mjs` - Astro configuration and integrations
- `package.json` - Dependencies and scripts
- `.eslintrc.*` - Linting rules
- `.prettierrc` - Formatting rules

## Common Patterns

When suggesting code changes:

1. Check existing patterns in the codebase first
2. Maintain consistency with current architecture
3. Consider the impact on bundle size and performance
4. Ensure type safety throughout
5. Follow the established error handling patterns
6. Maintain the current level of code documentation
