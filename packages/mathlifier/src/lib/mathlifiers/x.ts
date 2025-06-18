import type { Options as TemmlOptions } from "temml";
import temml from "temml";
import { type Modules, mathlifierFactory } from "../factory";

let temmlOptions: TemmlOptions = {};

export function setXOptions(newOptions: { temmlOptions?: TemmlOptions }): void {
	temmlOptions = newOptions.temmlOptions ?? {};
}

export function resetXOptions(): void {
	temmlOptions = {};
}

/**
 * adds math markup to template string,
 * and produces tex/html cross-compatible djot markup
 *
 * math: starts with ${x}, terminates with new line. Mathlifier will add $`x` delimiters.
 * display: starts with $${x}, terminates with empty line. Mathlifier will add $$`x` delimiters.
 * env: starts with #${'align'}x, etc, terminates with empty line. Mathlifier will add html and tex specific code blocks
 * text: starts with @${x}, terminates immediately. Mathlifier will interpolate these as regular strings
 */
export function x(strings: TemplateStringsArray, ...values: unknown[]): string {
	return mathlifierFactory(modules)(strings, ...values)
		.replace(
			/(?<![\\`])(\${1,2})(?!`)([\s\S]+?)(?<!\\)\1(?![`$])/g,
			(_, delim, content) => `${delim}\`${content.replaceAll("\\_", "_")}\``,
		)
		.replace(/(?<!\$)(\$`)([^`]+)`([.,])/g, "$1$2$3`");
}

const modules: Modules = {
	math: (x: string) => "$ " + x + " $",
	display: (x: string) => "$$ " + x + " $$",
	mathEnvs: {
		equation: (x: string) => insertEnv("equation", x),
		align: (x: string) => insertEnv("align", x),
		gather: (x: string) => insertEnv("gather", x),
		alignat: (x: string) => insertEnv("alignat", x),
		equationStar: (x: string) => insertEnv("equation*", x),
		alignStar: (x: string) => insertEnv("align*", x),
		gatherStar: (x: string) => insertEnv("gather*", x),
		alignatStar: (x: string) => insertEnv("alignat*", x),
	},
};

function insertEnv(env: string, content: string, args = ""): string {
	if (env === "alignat" || env === "alignat*") {
		let firstLine = content.split("\n")[0];
		if (!firstLine) {
			firstLine = content.split("\n")[1];
		}
		const twoN = firstLine.split("&").length;
		if (twoN % 2 !== 0)
			console.warn(
				`alignat should have an even number of columns, but got ${twoN} instead`,
			);
		args = `{${Math.floor(twoN / 2)}}`;
	}
	// todo: handle this with regex
	while (
		content.endsWith("\n") ||
		content.endsWith("\t") ||
		content.endsWith(" ")
	) {
		content = content.slice(0, content.length - 1);
	}
	const envMarkup = `\\begin{${env}}${args}${content}\n\\end{${env}}`;
	const html = temml.renderToString(envMarkup, {
		...temmlOptions,
		displayMode: true,
	});
	return `
\`\`\` =html
${html}
\`\`\`

\`\`\` =tex
${envMarkup}
\`\`\`
`;
}
