import type {
	DisplayMath,
	HTMLRenderer,
	InlineMath,
	Visitor,
} from "@djot/djot";
import type { Options } from "temml";
import temml from "temml";

export function djotMathOverride(
	options?: Options,
): Visitor<HTMLRenderer, string> {
	return {
		inline_math: (node: InlineMath) => {
			return temml.renderToString(node.text, { ...options });
		},
		display_math: (node: DisplayMath) => {
			return temml.renderToString(node.text, { displayMode: true, ...options });
		},
	};
}
