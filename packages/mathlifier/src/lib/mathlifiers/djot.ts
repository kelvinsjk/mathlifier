import { md } from "./md";

/**
 * generates djot markup by converting $x$ and $$x$$ to $`x` and $$`x`.
 * ams math environments are put in display math mode
 *
 * math: starts with ${x}, terminates with new line. MathlifierDj will add $`x` delimiters.
 * display: starts with $${x}, terminates with empty line. MathlifierDj will add $$`x` delimiters.
 * ams env: starts with #${'align'}x, etc, terminates with empty line. MathlifierDj will add $$`\begin{env}x\end{env}` delimiters.
 * text: starts with @${x}, terminates immediately. MathlifierDj will interpolate these as regular strings
 *
 * mathlifier will also turn any non-escaped $x$ delimiters into djot math $`x` syntax.
 */
export function dj(
	strings: TemplateStringsArray,
	...values: unknown[]
): string {
	const markup = md(strings, ...values);
	return markup
		.replace(
			/(?<![\\`])(\${1,2})(?!`)([\s\S]+?)(?<!\\)\1(?![`$])/g,
			(_, delim, content) => `${delim}\`${content.replaceAll("\\_", "_")}\``,
		)
		.replace(/(?<!\$)(\$`)([^`]+)`([.,])/g, "$1$2$3`");
}
