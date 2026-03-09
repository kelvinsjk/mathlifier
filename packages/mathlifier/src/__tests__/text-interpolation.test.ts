import { expect, it, describe } from "vitest";
import { md, x, mathlifier } from "../lib/main";

describe("Text interpolation tests", () => {
  describe("@${} text interpolation", () => {
    it("should interpolate text immediately (md)", () => {
      const result = md`Value: @${'hello'} world`;
      expect(result).toContain("Value: hello world");
    });

    it("should handle multiple text interpolations", () => {
      const a = "foo";
      const b = "bar";
      const result = md`@${a}@${b}`;
      expect(result).toBe("foobar");
    });

    it("should mix text and math interpolation", () => {
      const word = "result";
      const result = md`The @${word} is ${'x = 1'}

text`;
      expect(result).toContain("The result is");
      expect(result).toContain("$ x = 1 $");
    });
  });

  describe("${{}} empty math starter", () => {
    it("should handle empty object as math starter", () => {
      const result = md`${{}}x = 1

text`;
      expect(result).toContain("$ x = 1 $");
    });

    it("should handle empty string as math starter", () => {
      const result = md`${''}x = 1

text`;
      expect(result).toContain("$ x = 1 $");
    });
  });
});

describe("Edge cases", () => {
  it("should handle empty template", () => {
    const result = md``;
    expect(result).toBe("");
  });

  it("should handle template with only text", () => {
    const result = md`Just plain text`;
    expect(result).toBe("Just plain text");
  });

  it("should handle multiple newlines", () => {
    const result = md`${'x = 1'}


More text`;
    expect(result).toContain("$ x = 1 $");
  });

  it("should handle math with special characters", () => {
    const result = md`${'\\alpha + \\beta'}

text`;
    expect(result).toContain("$ \\alpha + \\beta $");
  });
});
