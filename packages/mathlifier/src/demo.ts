import {
  mathlifier,
  setMathlifierOptions,
  x,
  //resetOptions
} from "./lib/main";

const xString = "x";
const one = 1;

setMathlifierOptions({
  djotParseOptions: {
    warn: (warning) => console.log(warning.render()),
  },
  temmlOptions: {
    macros: { "\\inR": "\\in \\mathbb{R}" },
  },
  overrides: {
    emph: () => "italics override",
  },
  djotHTMLRenderOptions: {
    overrides: {
      strong: () => "strong override",
    },
  },
});
//resetOptions();

export const html = mathlifier`# Mathlifier demo

## Inline math

- Inline static math: $x$.
- Inline dynamic math ${xString}=1.
- Inline dynamic math gone awry: ${xString}=1 and then.
- Inline empty start 1: ${{}} x=${one}.
- Inline empty start 2: ${""} x=${one}.

## Display math

Static: $$ x $$
After displayed math.

Static with paragraphing:

$$ x $$

After displayed math.


### Dynamic

$${xString}
=
1,

then text

### Dynamic gone wrong

$${xString}
=
1
then text

### Display math should not touch punctuation 

$${xString}
=
1

.

## Amsmath environments

#${"align"} x &= 1
\\\\ y + z &= 2

## Escaped dollar signs

\\$x  vs $x$

Escaping within math $\\$x$, dynamic math ${"\\$x"},
and displayed math

$$ \\$x $$

$${"\\$"}x

## Dynamic text example

By default, all interpolation triggers math or display modes.
To interpolate strings, use a preceding @ symbol, like
in this e@${xString}ce@${one}@${one}ent example.

## Options

### Temml Options

$ x \\inR $ 

### Djot Parse Options (Warnings)

This attribute is unattached. {#foo}
djotParseOptions sent a warning to the console.

### Custom overrides

_italics_

### Djot HTML Render Options

*strong*

## Tests

### Inline should work across multiple lines

$\\begin{pmatrix}
1 \\\\
2
\\end{pmatrix}$

### Ending with dollar delimiter should work

$x.$`;

import { parse, renderHTML } from "@djot/djot";
import { djotMathOverride } from "./lib/mathlifiers/djot-math-override";

export const xDj = x`#${"align"}
x &= 1 \\\\
y &= 2`;

export const xHtml = renderHTML(parse(xDj), {
  overrides: { ...djotMathOverride() },
});
