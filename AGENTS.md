# Mathlifier Monorepo

> Tools for typesetting mathematics on the web

## Project Overview

Mathlifier is a TypeScript monorepo containing packages to help bring mathematical markup to the web. It provides functions and Svelte components to convert LaTeX math syntax into MathML using [Temml](https://temml.org/).

The project uses [pnpm](https://pnpm.io/) workspaces with [Changesets](https://github.com/changesets/changesets) for version management.

## Repository Structure

```
.
├── packages/
│   ├── mathlifier/         # Core library: math typesetting functions
│   ├── svelte-math/        # Svelte component for LaTeX -> MathML
│   └── svelte-djot-math/   # Svelte component for Djot markup with math
├── sites/
│   └── svelte-math/        # Demo/documentation site (SvelteKit)
├── npm-test/               # Manual npm package testing
├── node-test/              # Manual node import testing
└── .changeset/             # Changesets configuration
```

## Technology Stack

- **Language**: TypeScript 5.x
- **Package Manager**: pnpm 10.x
- **Build Tool**: Vite 6.x/7.x
- **UI Framework**: Svelte 5.x (runes mode)
- **Testing**: Vitest + Playwright (for Svelte packages)
- **Math Rendering**: Temml (LaTeX to MathML)
- **Markup Parsing**: @djot/djot
- **Versioning**: Changesets

## Packages

### `mathlifier`

Core library providing template literal functions for math markup.

**Key exports:**
- `mathlifier` - Tagged template for HTML output with Djot + MathML
- `md` - Tagged template for Markdown-like math syntax
- `dj` - Tagged template for Djot markup
- `x` - Tagged template for cross-compatible (HTML/PDF) output
- `math`, `display`, `align`, `gather`, etc. - Direct math rendering functions
- `mathlifierFactory` - Factory for custom math renderers

**Syntax:**
- Math: `${x}` - Inline math, terminates with newline
- Display: `$${x}` - Display math, terminates with empty line
- Math environments: `#${'align'}x` - AMS environments, terminates with empty line
- Text: `@{x}` - Plain text interpolation

### `svelte-math`

Svelte 5 component to render LaTeX math as MathML.

```svelte
<script>
  import Math from 'svelte-math';
</script>

<Math latex="x^2 + y^2 = z^2" />
<Math displayMode>
  \sum_{i=1}^n x_i = y
</Math>
```

### `svelte-djot-math`

Svelte 5 component to render Djot markup with math nodes.

```svelte
<script>
  import Djot from 'svelte-djot-math';
</script>

<Djot djot="$`x^2`$ and display math $$`E=mc^2`$$" />
```

## Build Commands

### Root Level

```bash
# Install dependencies for all packages
pnpm install

# Create a changeset for versioning
pnpm changeset

# Version packages based on changesets
pnpm version

# Publish packages
pnpm release
```

### Package Level (mathlifier)

```bash
cd packages/mathlifier

# Development mode
pnpm dev

# Build library
pnpm build

# Run tests
pnpm test

# Update test snapshots
pnpm updateSnapshot
```

### Package Level (svelte-math, svelte-djot-math)

```bash
cd packages/svelte-math  # or packages/svelte-djot-math

# Development mode
pnpm dev

# Build and package
pnpm build

# Type check
pnpm check

# Lint
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test
```

### Site Level

```bash
cd sites/svelte-math

# Development
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Testing Strategy

### Unit Tests

- **mathlifier**: Vitest with snapshot testing (`src/demo.test.ts`)
- **svelte-math**: Vitest for unit tests
- **svelte-djot-math**: Vitest for unit tests

### Integration Tests

- **svelte-math**: Playwright for browser testing
- **svelte-djot-math**: Playwright for browser testing

### Running Tests

```bash
# In mathlifier package
pnpm test

# In svelte packages
pnpm test:unit      # Vitest
pnpm test:integration  # Playwright
pnpm test           # Both
```

### Snapshot Testing

The mathlifier package uses snapshot testing for HTML output comparison. Update snapshots with:

```bash
pnpm updateSnapshot
```

## Code Style Guidelines

### TypeScript

- Use TypeScript for all source files
- Enable strict mode in `tsconfig.json`
- Prefer explicit types for public APIs

### Svelte

- Use Svelte 5 runes syntax (`$props`, `$state`, `$effect`, `$derived`)
- Use TypeScript in `<script lang="ts">` blocks
- Components should be self-contained with minimal external dependencies

### Formatting

- Use Prettier for code formatting
- Svelte packages include `prettier-plugin-svelte`
- Run `pnpm format` to fix formatting issues

### Linting

- ESLint is configured for Svelte packages
- TypeScript ESLint for type-aware linting
- Run `pnpm lint` to check for issues

## Package Publishing

### Workflow

1. Make changes to packages
2. Run `pnpm changeset` to create a changeset
3. Commit changes and changeset
4. Run `pnpm version` to bump versions
5. Run `pnpm release` to publish to npm

### Access

Packages are published as public (see `.changeset/config.json`).

## Dependencies

### Key Dependencies

- **temml**: LaTeX to MathML rendering
- **@djot/djot**: Djot markup parsing

### Peer Dependencies

- **svelte**: ^5.0.0 (for svelte-math and svelte-djot-math)

## Development Conventions

### Import Style

- Use ES modules (`"type": "module"` in package.json)
- Use explicit `.js` extensions in imports (TypeScript handles resolution)

### Module Exports

- **mathlifier**: UMD and ESM builds via Vite
- **svelte-math**: Svelte component exports
- **svelte-djot-math**: Svelte component exports

### Testing Files

- Unit tests: `src/**/*.test.ts`
- Integration tests: Playwright tests in package root

## Security Considerations

- The `@html` directive is used in Svelte components to render MathML output
- Ensure LaTeX input is sanitized if coming from untrusted sources
- The library renders raw HTML via `{@html html}` in Svelte components

## License

MIT License - See LICENSE file for details

## Links

- Repository: https://github.com/kelvinsjk/mathlifier
- npm packages:
  - `mathlifier`
  - `svelte-math`
  - `svelte-djot-math`
