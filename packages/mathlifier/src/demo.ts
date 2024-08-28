import {
  mathlifier as md,
  setOptions,
  //resetOptions
} from "./lib/mathlifiers";

const x = "x";
const one = 1;

setOptions({
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

export const html = md`# Mathlifier demo

## Inline math

- Inline static math: $x$.
- Inline dynamic math ${x}=1.
- Inline dynamic math gone awry: ${x}=1 and then.
- Inline empty start 1: ${{}} x=${one}.
- Inline empty start 2: ${""} x=${one}.

## Display math

Static: $$ x $$
After displayed math.

Static with paragraphing:

$$ x $$

After displayed math.


### Dynamic

$${x}
=
1,

then text

### Dynamic gone wrong

$${x}
=
1
then text

### Display math should not touch punctuation 

$${x}
=
1

.

## Amsmath environments

$${"align"} x &= 1
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
in this e@${x}ce@${one}@${one}ent example.

## Options

### Temml Options

$ \\inR $ 

### Djot Parse Options (Warnings)

This attribute is unattached. {#foo}
djotParseOptions sent a warning to the console.

### Custom overrides

_italics_

### Djot HTML Render Options

*strong*

`;
