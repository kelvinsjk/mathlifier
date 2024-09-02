# Mathlifier Changelog

## 2.0.0

### Major Changes

- Feat: `mathlifier`, `mathlifierTex`, `mathlifierDj`, `mathlifierFactory`
  enables easy interpolation between math and regular text.

### BREAKING CHANGES

- KaTeX is now replaced by Temml, which renders MathML strings.
- Removed typesetting functions like `newline`, `newParagraph`, etc.
