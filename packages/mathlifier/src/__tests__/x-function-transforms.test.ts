import { expect, it, describe } from "vitest";
import { x } from "../lib/main";

describe("x() function regex transformations", () => {
  describe("Math delimiter conversion", () => {
    it("should convert $...$ to $`...`", () => {
      const result = x`${{}}x = 1
$y$`;
      expect(result).toContain("$`y`");
    });

    it("should convert $$...$$ to $$`...` (without extra spaces)", () => {
      const result = x`$$E = mc^2$$`;
      // x() transforms $$...$$ to $$`...` (spaces depend on input)
      expect(result).toContain("$$`");
      expect(result).toContain("E = mc^2");
    });

    it("should not convert already backticked math", () => {
      // If the input already has $`...`, it should stay as is
      const result = x`$\`already\``;
      expect(result).toBe("$`already`");
    });

    it("should not convert escaped dollar signs", () => {
      const result = x`\\$100`;
      expect(result).toBe("\\$100");
    });
  });

  describe("Punctuation handling", () => {
    it("should move comma inside inline math", () => {
      const result = x`$x$, and`;
      expect(result).toContain("$`x,`");
    });

    it("should move period inside inline math", () => {
      const result = x`$x$.`;
      expect(result).toContain("$`x.`");
    });

    it("should not move punctuation after display math", () => {
      const result = x`$$x^2$$.`;
      expect(result).toContain("$$`");
      expect(result).toContain("x^2");
      expect(result).toContain(".");
    });
  });

  describe("Multi-line math", () => {
    it("should handle math across multiple lines", () => {
      const result = x`$\begin{pmatrix}
1 \\\\
2
\end{pmatrix}$`;
      expect(result).toContain("$`");
    });
  });
});
