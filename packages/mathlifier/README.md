# Mathlifier

> [!IMPORTANT] Breaking change in v2: we now use Temml instead of KaTeX for
> rendering

<!-- new blockquote -->

> A simpler way to render math on the web

A collection of tools to help render mathematics in HTML and MathML

[![mathlifier npm version](https://img.shields.io/npm/v/mathlifier)](https://github.com/kelvinsjk/mathlified/tree/main/packages/mathlifier)
[![mathlifier minzip size](https://img.shields.io/bundlephobia/minzip/mathlifier)](https://github.com/kelvinsjk/mathlified/tree/main/packages/mathlifier)

---

## Installing Mathlifier

```bash
npm i mathlifier
```

## Using Mathlifier

### A sprinkle of math

If you just need a sprinkle of math within your document, use the following
functions to get HTML/MathML strings. Subsequently attach the the output to the
DOM along with your other content.

```js
// import functions
import { math, display, alignStar } from "mathlifier";
// example of using these functions
const inlineMath = math("ax^2+bx+c=0");
const displayedMath = display("x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}");
const alignedEnv = alignStar("x &= 2-1 \\\\ &= 1");
// also available:
// - align
// - gather, gatherStar
// - equation, eqn, equationStar, eqnStar
// - alignat, alignatStar
```

### Mixing prose and math via mathlifier

When working with dynamically generated mathematical content interspersed with
prose, we find ourselves calling the previous functions over and over.
Markdown-like notation is also easier to handle vs HTML. Because of the
potential ambiguity of Markdown leading to bugs, we use
[Djot](https://djot.net/) syntax (which is very similar to markdown).

Mathlifier provides the `mathlifier` tagged template function, which takes Djot
markup interspersed with math notation interpolations, and outputs a HTML
string.

```js
import { mathlifier } from "mathlifier";
const x = "x";
const xVal = 2;
const djotMarkup = mathlifier`
Interpolation starts _math mode_ so ${x} = ${xVal}
renders "x=2" in math mode.

_Display_ and _amsmath environment_ modes start with
an additional $ before interpolation.
It spans multiple lines and ends with an empty line.
Amsmath environments are automatically closed
after they end.

$${xVal}x^2 + x - 3
= ${xVal}

$${"align"} x &= ${xVal}
\\\\ y &= 3

If we want to *prevent* math mode and do regular
interpolation (ie text), prefix with an @ symbol,
like this e@${x}cellent example.

Regular static math will also be converted.
For example, $x=2$ and $$y=3.$$
This means that regular dollar signs
must be escaped, like \\$5.
`;
```

The `mathlifierTex` tagged template function tags math and display environment
with $ and $$ delimiters. This is useful for producing LaTeX, though take note
that amsmath environments are placed within $$ delimiters, which is invalid
LaTeX behavior but necessary for the web.

The `mathliferDj` tagged template function returns Djot markup, so $x$ and $$y$$
become $\`x\` and $$\`y\`. The `mathlifier` function uses `mathlifierTex` and
`mathlifierDj` under the hood and finally renders the djot markup produced with
the Djot library, adding an override to produce math output via Temml.

Finally we also provide the `mathlifierFactory` function to help you design your
own "mathlifier" function by specifying how math/display math and
math-environments should be handled. For example, a LaTeX focused
"`mathlifierLatex`" function can be produced by the following:

```js
const mathlifierLatex = mathlifierFactory({
  math: (x) => "\\(" + x + ")\\",
  display: (x) => "\\[" + x + "]\\",
  mathEnvs: {
    equation: (x) => "\\begin{equation}" + x + "\\end{equation}",
    // etc
  },
});
```

## Temml options

All [Temml options](https://temml.org/docs/en/administration#options) are passed
along.

```js
// example of Temml options
const noWrap = math("x=1", { wrap: "none" });
const leftEqn = display("\\begin{equation} x \\inR \\end{equation}", {
  leqno: true,
  macros: {
    "\\inR": "\\in \\mathbb{R}",
  },
});
```

```js
import { mathlifier, setOptions } from "mathlifier";
setOptions({ temmlOptions: { macros: { "\\inR": "\\in \\mathbb{R}" } } });
const macrosEnabledMarkup = mathlifier`$ x \\inR $`;
// the resetOptions function can be used to reset this behavior
```

## V1 vs V2

Previously existing functions (`math`, `display`, `align`, etc) should work
similarly. The difference is that they now produce MathML strings via Temml
instead of KaTeX. See the [Temml GitHub repo](https://github.com/ronkok/Temml)
for the differences between the two libraries.

### Functions that are removed

The following functions, that were available in V1 but not documented, are
removed in V2.

- linebreak, newline, newParagraph
- bold, strong, emph, em
- html, tex, htmlTex

These functions were used, along with the separate `mathlifier2` library, in an
attempt to have a single source code output to web and LaTeX. We have since
achieved this goal by using Djot markup along with the new `mathlifier`,
`mathlifierDj` and `mathlifierTex` tagged template functions, so they are no
longer necessary.

### Upgrading to V2

To upgrade, you can remove the CSS file for KaTeX required in V1 and add the CSS
and font files for Temml required in V2. See the
[Temml docs](https://temml.org/docs/en/administration#overview) for information
for those files.

### Why we made the switch

Temml is more lightweight than KaTeX and MathJax. Moreover, one common pain
point in the previous use of KaTeX was double rendering if we did not include
the css file. With Temml able to use local fonts, we found that the output still
looks passable for simple use cases if one was to miss out on the css and font
file (we do still highly recommend adding them to your project for the best
rendering output)

### Update on previous opinions

Mathlifier imposed 3 default opinions on the output in V1.

#### Opinion 1: throwOnError: false

Unlike KaTeX, Temml sets this to false by default so there is **no change** in
V2.

#### Opinion 2: No line break in inline math

**Breaking change**. We have since come around on this opinion (this ensures
compatibility if writing source code meant for both the web and LaTeX).

You can maintain previous behavior by wrapping your input with braces:
`math("{x=a=2}")`. Temml also ships with a `wrap` option so we can use
`math("x=a=2", {wrap: "none"})` to prevent line breaking.

By default, Temml sets a soft line break after every top-level relation and
binary operator, like in TeX. They also supply an `=` option for a soft line
break before the second and subsequent top-level `=` signs, which we can use
`math("x=a=2", {wrap: "="})`.

#### Opinion 3: Displayed math with overflow-x: auto

**Breaking change**. We still believe in this opinion as it makes our output
more mobile-friendly. However, our original approach of using an inline-style
makes it hard for css cascade overrides for power users.

We recommend adding the following css rule to replicate the previous behavior.

```css
*:has(> math.tml-display) {
  overflow-x: auto;
  width: 100%;
}
```

## Credits

- [Temml](https://temml.org)
- [Djot](https://djot.net)

## License

[MIT](https://github.com/kelvinsjk/mathlified/blob/896289c646c1a7c8b1a6a52a74a4a22fd2d6d500/packages/mathlifier/LICENSE)
