import { expect, it, describe } from "vitest";
import { md, x, mathlifier } from "../lib/main";

describe("Inline math tests", () => {
  describe("md() function", () => {
    it("should wrap inline math with $ delimiters", () => {
      const result = md`${'x^2'}

text`;
      expect(result).toContain("$ x^2 $");
    });

    it("should handle inline math at end of string", () => {
      const result = md`${'x'}`;
      expect(result).toBe("$ x $");
    });

    it("should handle multiple inline math expressions on separate lines", () => {
      const result = md`The equation ${'x = 1'}
and ${'y = 2'}
are simple.

More text`;
      expect(result).toContain("$ x = 1 $");
      expect(result).toContain("$ y = 2 $");
    });

    it("should handle inline math with interpolation", () => {
      const value = "a + b";
      const result = md`The sum is ${value}

text`;
      expect(result).toContain("$ a + b $");
    });
  });

  describe("x() function", () => {
    it("should wrap inline math with $` delimiters", () => {
      const result = x`${'x^2'}

text`;
      expect(result).toContain("$` x^2 `");
    });

    it("should handle math at end of string", () => {
      const result = x`${'x'}`;
      expect(result).toBe("$` x `");
    });
  });

  describe("mathlifier() function - HTML output", () => {
    it("should render inline math as MathML", () => {
      const result = mathlifier`${'x^2'}

text`;
      expect(result).toContain("<math");
      // Note: temml may or may not add display="inline" attribute
      expect(result).toContain("<msup>");
    });

    it("should handle multiple inline math", () => {
      const result = mathlifier`Values: ${'a'} and ${'b'}

text`;
      expect(result).toContain("<math");
    });
  });
});
