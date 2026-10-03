import cn from "./cn";
import { describe, expect, it } from "vitest";

describe("cn", () => {
  it("resolves conflicting Tailwind classes while preserving other utilities", () => {
    expect(cn("p-2 text-sm", "p-4", { hidden: false, flex: true })).toBe("text-sm p-4 flex");
  });

  it("keeps responsive variants separate from base utilities", () => {
    expect(cn("p-2 md:p-4", "p-3")).toBe("md:p-4 p-3");
  });
});
