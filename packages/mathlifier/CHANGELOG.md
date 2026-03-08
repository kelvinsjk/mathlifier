# Mathlifier Changelog

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
  are untouched so you can upgrade without changes if those are the only
  functions in use.

### Patch Changes

- fix: correct output when string ends in $

## 2.0.3

### Patch Changes

- bug fixes: inline math now supports content spanning multiple lines

## 2.0.2

### Patch Changes

- bug fixes: export legacy math, display, etc functions

## 2.0.1

### Patch Changes

- bug fixes: added file and prepublish script to package.json

## 2.0.0

### Major Changes

- Feat: `mathlifier`, `mathlifierTex`, `mathlifierDj`, `mathlifierFactory`
  enables easy interpolation between math and regular text.

### BREAKING CHANGES

- KaTeX is now replaced by Temml, which renders MathML strings.
- Removed typesetting functions like `newline`, `newParagraph`, etc.
