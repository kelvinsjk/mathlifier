import { mathlifierTex } from "./tex";

/**
 * generates djot markup.
 *
 * math: starts with ${x}, terminates with new line. MathlifierDj will add $`x` delimiters.
 * display: starts with $${x}, terminates with empty line. MathlifierDj will add $$`x` delimiters.
 * ams env: starts with $${'align'}x, etc, terminates with empty line. MathlifierDj will add $$`\begin{env}x\end{env}` delimiters.
 * text: starts with @${x}, terminates immediately. MathlifierDj will interpolate these as regular strings
 *
 * mathlifier will also turn any non-escaped $x$ delimiters into djot math $`x` syntax.
 */
export function mathlifierDj(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  const markup = mathlifierTex(strings, ...values);
  return markup
    .replace(/(?<!\\)\$(?!`)\$([^]+?)\$\$/g, (_, match) => `$$\`${match}\``)
    .replace(/(?<!\\)\$(?!`)(.+?)(?<!\\)\$/g, (_, match) => `$\`${match}\``);
}
