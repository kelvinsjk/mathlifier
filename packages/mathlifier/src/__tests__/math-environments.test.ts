import { expect, it, describe } from "vitest";
import { md, x, mathlifier } from "../lib/main";

describe("Math environment tests", () => {
  describe("align environment", () => {
    it("should wrap align in $$ delimiters (md)", () => {
      const result = md`#${'align'} x &= 1 \\ y &= 2

text`;
      expect(result).toContain("$$");
      expect(result).toContain("\\begin{align}");
      expect(result).toContain("\\end{align}");
    });

    it("should handle align* (md)", () => {
      const result = md`#${'align*'} x &= 1

text`;
      expect(result).toContain("\\begin{align*}");
    });
  });

  describe("equation environment", () => {
    it("should wrap equation in $$ delimiters (md)", () => {
      const result = md`#${'equation'} E = mc^2

text`;
      expect(result).toContain("$$");
      expect(result).toContain("\\begin{equation}");
    });

    it("should handle equation* (md)", () => {
      const result = md`#${'equation*'} x = 1

text`;
      expect(result).toContain("\\begin{equation*}");
    });
  });

  describe("gather environment", () => {
    it("should wrap gather in $$ delimiters (md)", () => {
      const result = md`#${'gather'} x = 1 \\ y = 2

text`;
      expect(result).toContain("$$");
      expect(result).toContain("\\begin{gather}");
    });
  });

  describe("Math environments (x function)", () => {
    it("should wrap align with html/tex code blocks", () => {
      const result = x`#${'align'} x &= 1 \\ y &= 2

text`;
      // x() produces html/tex code blocks for environments
      expect(result).toContain("``` =html");
      expect(result).toContain("``` =tex");
      expect(result).toContain("\\begin{align}");
    });
  });

  describe("Math environments (mathlifier function)", () => {
    it("should render align as MathML", () => {
      const result = mathlifier`#${'align'} x &= 1 \\ y &= 2

text`;
      expect(result).toContain("<math");
      expect(result).toContain('display="block"');
    });
  });
});
