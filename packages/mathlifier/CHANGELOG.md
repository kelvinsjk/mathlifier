# Mathlifier Changelog

## 3.5.1

### Patch Changes

- Fix display mode and trailing inline math bugs

  - Fixed display mode that was broken by the 3.4.1 fix
  - Properly fixed the trailing inline math bug without breaking display mode
  - Added `isLast` parameter to `startNewEnv` to detect end of template
  - Fixed regex in `x()` function to properly match math after newlines
  - Added comprehensive test suite with 43 tests

## 3.5.1

### Patch Changes

- Fix display mode and trailing inline math bugs

  Fixed display mode that was broken by the 3.4.1 fix. The issue was that the `startNewEnv` function's condition `after === "$"` didn't catch `$${...}` syntax where `after` is a string like `"text $"`.

  Properly fixed the trailing inline math bug by:

  - Adding `isLast` parameter to `startNewEnv` to detect when processing the last string
  - Display mode only triggers when: `after.endsWith("$")` AND `!isLast` AND `nextVal` is not an empty object

  Fixed regex in `x()` function: changed `(?<![\\`])`to`(?<![\])` to allow matching math after newlines.

  Added comprehensive test suite with 43 tests covering inline math, display mode, math environments, text interpolation, and edge cases.

## 3.5.0

### Minor Changes

- efef7e9: Export `djotMathOverride` function from `mathlifier` package. This allows users to use the djot math override directly when rendering djot content with custom HTML renderers.

  Also consolidates import style in `svelte-djot-math` for consistency.

## 3.4.1

### Patch Changes

- Fix bug where trailing inline math `$...$` loses closing delimiter when preceded by display math starter `${{}}`

  The `startNewEnv` function in the factory was incorrectly treating the trailing `$` of inline math as a display math starter. Changed the condition from `after.endsWith("$")` to `after === "$" || after.endsWith("$$")` to properly distinguish between `$${...}` (display math starter) and `$y$` (inline math).

## 3.3.0

### Minor Changes

- bump version number to eliminate mismatch. previous changeset (bump temml version) applicable for this

## 3.2.0

### Minor Changes

- bump depedencies. in particular, temml is updated to version 0.12.2

## 3.1.0

### Minor Changes

- feat: exports djotMathToHTML function

## 3.0.0

### Major Changes

- feat: introduced the `x` function to produce html/tex compatible djot markup,
  along with setXOptions and resetXOptions

### Breaking Changes

- environments are now triggered by #${} instead of ${}
- mathlifierTex is now md, mathlifierDj is now dj
- setOptions and resetOptions are now setMathlifierOptions and
  resetMathlifierOptions
- Only `mathlifier*` functions are changed. "Sprinkles" (`math`, `display`, etc)
  remain unchanged

## 2.0.0

### Major Changes

- feat: consolidate all mathlifier functions into a single package with multiple
  entry points

### Breaking Changes

- Named imports changed from `mathlifier` to `mathlifierStandalone` and
  `mathlifierSvelte` for the standalone and svelte versions respectively
- Renamed various functions for clarity (e.g., `mathlifierObj` to `mathlifier`,
  `mathlifier` to `mathlifierString`)

## 1.1.0

### Minor Changes

- feat: add sprinkles functions (math, display, align, gather, alignat)

## 1.0.1

### Patch Changes

- docs: fix README.md typo

## 1.0.0

### Major Changes

- feat: initial stable release
