import temml from "temml";
import type { Options } from "temml";

export function math(x: string, options?: Options): string {
  return temml.renderToString(x, options);
}
export function display(x: string, options?: Options): string {
  return temml.renderToString(x, { ...options, displayMode: true });
}
export function align(x: string, options?: Options): string {
  return amsEnv("align", x, options);
}
export function alignStar(x: string, options?: Options): string {
  return amsEnv("align*", x, options);
}
export function alignat(x: string, pairs: number, options?: Options) {
  return display(`\\begin{alignat}{${pairs}}${x}\\end{alignat}`, options);
}
export function alignatStar(x: string, pairs: number, options?: Options) {
  return display(`\\begin{alignat*}{${pairs}}${x}\\end{alignat*}`, options);
}
export function gather(x: string, options?: Options): string {
  return amsEnv("gather", x, options);
}
export function gatherStar(x: string, options?: Options): string {
  return amsEnv("gather*", x, options);
}
export function equation(x: string, options?: Options): string {
  return amsEnv("equation", x, options);
}
export function equationStar(x: string, options?: Options): string {
  return amsEnv("equation*", x, options);
}
export const eqn = equation;
export const eqnStar = equationStar;

function amsEnv(env: string, x: string, options?: Options): string {
  return display(`\\begin{${env}}${x}\\end{${env}}`, options);
}
