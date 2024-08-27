import { mathlifierFactory, type Modules } from "../factory";

/**
 * adds math markup to template string.
 *
 * math: starts with ${x}, terminates with new line. Mathlifier will add $x$ delimiters.
 * display: starts with $${x}, terminates with empty line. Mathlifier will add $$x$$ delimiters.
 * amsmath env: starts with $${'align'}x, etc, terminates with empty line. Mathlifier will add $$\begin{env}x\end{env}$$ delimiters.
 * text: starts with @${x}, terminates immediately. Mathlifier will interpolate these as regular strings
 */
export function mathlifierTex(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  return mathlifierFactory(modules)(strings, ...values);
}

const display = (x: string) => "$$ " + x + " $$";

const modules: Modules = {
  math: (x: string) => "$ " + x + " $",
  display,
  mathEnvs: {
    equation: (x: string) => display(insertEnv("equation", x)),
    align: (x: string) => display(insertEnv("align", x)),
    gather: (x: string) => display(insertEnv("gather", x)),
    alignat: (x: string) => display(insertEnv("alignat", x)),
    equationStar: (x: string) => display(insertEnv("equation*", x)),
    alignStar: (x: string) => display(insertEnv("align*", x)),
    gatherStar: (x: string) => display(insertEnv("gather*", x)),
    alignatStar: (x: string) => display(insertEnv("alignat*", x)),
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
        `alignat should have an even number of columns, but got ${twoN} instead`
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
  return `\\begin{${env}}${args}${content}\n\\end{${env}}`;
}
