import { applyTheme, getTheme } from "./theme";
import { describe, expect, it } from "vitest";

describe("theme selection", () => {
  it.each([
    ["light", true, "light"],
    ["dark", false, "dark"],
    [null, true, "dark"],
    [null, false, "light"],
    ["invalid", false, "light"],
  ] as const)("resolves stored %s with system dark=%s to %s", (stored, prefersDark, expected) => {
    expect(getTheme(stored, prefersDark)).toBe(expected);
  });

  it("updates both shadcn styles and article theme selectors", () => {
    const root = document.createElement("html");
    root.classList.add("existing");
    applyTheme(root, "dark");
    expect(root).toHaveClass("dark", "existing");
    expect(root.dataset.theme).toBe("dark");
    applyTheme(root, "light");
    expect(root).not.toHaveClass("dark");
    expect(root).toHaveClass("existing");
    expect(root.dataset.theme).toBe("light");
  });
});
