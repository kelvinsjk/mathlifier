import { type HTMLRenderer, parse, renderHTML, type Visitor } from "@djot/djot";
import type { Options as TemmlOptions } from "temml";
import { djotMathOverride } from "./djot-math-override";
import { md } from "./md";

let djotParseOptions: Parameters<typeof parse>[1] = {};
let temmlOptions: TemmlOptions = {};
let customOverrides: Visitor<HTMLRenderer, string> = {};
let djotHTMLRenderOptions: Parameters<typeof renderHTML>[1] = {};

export function setMathlifierOptions(newOptions: {
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

export function resetMathlifierOptions(): void {
	djotHTMLRenderOptions = {};
	djotParseOptions = {};
	temmlOptions = {};
	customOverrides = {};
}

/**
 * generates html markup from provided djot markup with math nodes converted to MathML via temml.
 * We will also move any commas and full stops after inline math nodes to prevent HTML line-break at these punctuations.
 *
 * set any temml and djot options with the setMathlifierOptions function and reset them with resetMathlifierOptions
 *
 * math: starts with ${x}, terminates with new line.
 * display: starts with $${x}, terminates with empty line.
 * ams env: starts with #${'align'}x, etc, terminates with empty line.
 * text: starts with @${x}, terminates immediately. Mathlifier will interpolate these as regular strings
 *
 * All remaining $x$ and $$x$$ will also be converted to MathML.
 *
 * Full stops and commas right after an inline math node will be shifted inside to prevent potentially weird line breaks from HTML
 * */
export function mathlifier(
	strings: TemplateStringsArray,
	...values: unknown[]
): string {
	// move commas and full stops into inline math nodes
	const markup = md(strings, ...values);
	return djotMathToHTML(markup, {
		temmlOptions,
		djotHTMLRenderOptions,
		djotParseOptions,
		overrides: customOverrides,
	});
}

/**
 * outputs html from djot markup
 *
 * the default transform applies the following:
 * - convert $x$ and $$x$$ math markup to the djot equivalent
 * - move commas and full stops into inline math nodes
 */
export function djotMathToHTML(
	markup: string,
	options?: {
		transform?: (x: string) => string;
		temmlOptions?: TemmlOptions;
		djotHTMLRenderOptions?: Parameters<typeof renderHTML>[1];
		djotParseOptions?: Parameters<typeof parse>[1];
		overrides?: Visitor<HTMLRenderer, string>;
	},
): string {
	const transform =
		options?.transform ??
		((x) => {
			return x
				.replace(
					/(?<![\\`])(\${1,2})(?!`)([\s\S]+?)(?<!\\)\1(?![`$])/g,
					(_, delim, content) =>
						`${delim}\`${content.replaceAll("\\_", "_")}\``,
				)
				.replace(/(?<!\$)(\$`)([^`]+)`([.,])/g, "$1$2$3`");
		});
	const overrides = {
		...djotMathOverride(options?.temmlOptions),
		...options?.overrides,
		...options?.djotHTMLRenderOptions?.overrides,
	};
	const finalOptions = {
		...options?.djotHTMLRenderOptions,
		overrides,
	};
	return renderHTML(
		parse(transform(markup), options?.djotParseOptions),
		finalOptions,
	);
}
