import CardSkeleton from "../posts/CardSkeleton.svelte";
import { Badge } from "./badge";
import { Button } from "./button";
import { Input } from "./input";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";

describe("UI components", () => {
  it("forwards clicks and prevents disabled button activation", async () => {
    const onclick = vi.fn();
    const { rerender } = render(Button, { "aria-label": "Add tag", onclick });
    const button = screen.getByRole("button", { name: "Add tag" });
    await fireEvent.click(button);
    expect(onclick).toHaveBeenCalledOnce();
    await rerender({ "aria-label": "Add tag", onclick, disabled: true });
    expect(button).toBeDisabled();
    button.click();
    expect(onclick).toHaveBeenCalledOnce();
  });

  it("renders navigation as a link and removes disabled destinations", async () => {
    const { rerender } = render(Button, {
      href: "/posts",
      "aria-label": "Read Blog",
    });
    expect(screen.getByRole("link")).toHaveAttribute("href", "/posts");
    await rerender({
      href: "/posts",
      "aria-label": "Read Blog",
      disabled: true,
    });
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("href");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
  });

  it("forwards input events and accessible labels", async () => {
    const oninput = vi.fn();
    render(Input, { "aria-label": "Search posts", oninput });
    const input = screen.getByRole("textbox", { name: "Search posts" });
    await fireEvent.input(input, { target: { value: "headings" } });
    expect(input).toHaveValue("headings");
    expect(oninput).toHaveBeenCalledOnce();
  });

  it("renders navigable tag badges", () => {
    render(Badge, { href: "/search?tags=ctf", "aria-label": "ctf" });
    expect(screen.getByRole("link", { name: "ctf" })).toHaveAttribute("href", "/search?tags=ctf");
  });

  it("keeps loading placeholders out of the accessibility tree", () => {
    const { container } = render(CardSkeleton, { count: 2 });
    const cards = container.querySelectorAll('[data-slot="card"]');
    expect(cards).toHaveLength(2);
    for (const card of cards) expect(card).toHaveAttribute("aria-hidden", "true");
  });
});
