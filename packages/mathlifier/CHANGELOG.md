# Mathlifier Changelog

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
