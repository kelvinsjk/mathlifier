import { expect, it, describe } from "vitest";
import { md, x } from "../lib/main";

describe("Display mode tests", () => {
  describe("md() function - markdown output", () => {
    it("should wrap display math with $$ delimiters", () => {
      const result = md`$${'x^2 + y^2 = z^2'}

Some text`;
      expect(result).toContain("$$ x^2 + y^2 = z^2 $$");
    });

    it("should handle display math at end of string", () => {
      const result = md`$${'x^2'}`;
      expect(result).toBe("$$ x^2 $$");
    });

    it("should handle multiple display math blocks", () => {
      const result = md`First:
$${'x = 1'}

Second:
$${'y = 2'}

End`;
      expect(result).toContain("$$ x = 1 $$");
      expect(result).toContain("$$ y = 2 $$");
    });
  });

  describe("x() function - djot output", () => {
    it("should wrap display math with $$` delimiters", () => {
      const result = x`$${'x^2'}

text`;
      expect(result).toContain("$$` x^2 `");
    });

    it("should handle multiple display math blocks", () => {
      const result = x`First:
$${'x = 1'}

Second:
$${'y = 2'}

End`;
      expect(result).toContain("$$` x = 1 `");
      expect(result).toContain("$$` y = 2 `");
    });
  });
});
