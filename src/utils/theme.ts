export type Theme = "light" | "dark";

export function getTheme(stored: string | null, prefersDark: boolean): Theme {
  if (stored === "light" || stored === "dark") return stored;
  return prefersDark ? "dark" : "light";
}

export function applyTheme(root: HTMLElement, theme: Theme) {
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
}
