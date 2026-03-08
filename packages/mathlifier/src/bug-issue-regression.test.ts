import { expect, it, describe } from "vitest";
import { x } from "./lib/main";

describe("Bug fix: Trailing inline math after display math starter", () => {
  // Regression test for: Trailing inline math `$...$` loses closing delimiter 
  // when preceded by display math starter `${{}}`
  
  it("should preserve closing $ in inline math after ${{}} with newline", () => {
    const result = x`${{}}x
$y$`;
    
    // The inline math $y$ should be converted to $`y`
    expect(result).toContain("$`y`");
    // Should not have the bug where trailing $ is truncated
    expect(result).not.toMatch(/\$y[^`]/); // $y not followed by backtick
  });

  it("should handle inline math at end after display starter with content", () => {
    const result = x`${{}}some content
$y$`;
    
    expect(result).toContain("$`y`");
  });

  it("workaround with space should still work", () => {
    // The workaround mentioned in the bug report: adding a space after $y$
    const result = x`${{}}x
$y$ `;
    
    expect(result).toContain("$`y`");
  });

  it("inline math in the middle should work", () => {
    const result = x`${{}}x
$y$ and then more text`;
    
    expect(result).toContain("$`y`");
  });
});
