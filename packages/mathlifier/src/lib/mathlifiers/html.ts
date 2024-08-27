import { mathlifierDj } from "./djot";
import { djotMathOverride } from "./djot-math-override";
import { Options as TemmlOptions } from "temml";
import { renderHTML, parse, type Visitor, type HTMLRenderer } from "@djot/djot";

let djotParseOptions: Parameters<typeof parse>[1] = {};
let temmlOptions: TemmlOptions = {};
let customOverrides: Visitor<HTMLRenderer, string> = {};
let djotHTMLRenderOptions: Parameters<typeof renderHTML>[1] = {};

export function setOptions(newOptions: {
  djotParseOptions?: Parameters<typeof parse>[1];
  temmlOptions?: TemmlOptions;
  djotHTMLRenderOptions?: Parameters<typeof renderHTML>[1];
  overrides?: Visitor<HTMLRenderer, string>;
}): void {
  temmlOptions = newOptions.temmlOptions ?? {};
  djotHTMLRenderOptions = newOptions.djotHTMLRenderOptions ?? {};
  djotParseOptions = newOptions.djotParseOptions ?? {};
  customOverrides = newOptions.overrides ?? {};
}

export function resetOptions(): void {
  djotHTMLRenderOptions = {};
  djotParseOptions = {};
  temmlOptions = {};
  customOverrides = {};
}

/**
 * generates html markup, with the main text interpreted as djot markup,
 * and math nodes converted to MathML via temml.
 * We will also move any commas and full stops after inline math nodes to prevent HTML line-break at these punctuations.
 *
 * set any temml and djot options with the setOptions function
 *
 * math: starts with ${x}, terminates with new line. MathlifierDj will add $`x` delimiters.
 * display: starts with $${x}, terminates with empty line. MathlifierDj will add $$`x` delimiters.
 * ams env: starts with $${'align'}x, etc, terminates with empty line. MathlifierDj will add $$`\begin{env}x\end{env}` delimiters.
 * text: starts with @${x}, terminates immediately. MathlifierDj will interpolate these as regular strings
 *
 * mathlifier will also turn any non-escaped $x$ delimiters into djot math $`x` syntax.
 */
export function mathlifier(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  // move commas and full stops into inline math nodes
  const markup = mathlifierDj(strings, ...values).replace(
    /(?<!\$)(\$\`)([^`]+)\`([.,])/g,
    "$1$2$3`"
  );
  const doc = parse(markup, djotParseOptions);
  const overrides = {
    ...djotMathOverride(temmlOptions),
    ...customOverrides,
    ...djotHTMLRenderOptions?.overrides,
  };
  djotHTMLRenderOptions = { ...djotHTMLRenderOptions, overrides };
  return renderHTML(doc, { ...djotHTMLRenderOptions });
}
