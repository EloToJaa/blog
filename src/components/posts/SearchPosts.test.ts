import SearchPosts from "./SearchPosts.svelte";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";
const fetchIndex = vi.fn();
beforeEach(() => {
  vi.stubGlobal("fetch", fetchIndex);
  fetchIndex.mockReset();
  fetchIndex.mockResolvedValue(Response.json([]));
  window.history.replaceState({ index: 1 }, "", "/search");
});
describe("static search controls", () => {
  it("restores query and tags while preserving Astro history", async () => {
    window.history.replaceState({ index: 1 }, "", "/search?q=headings&tags=%5B%22others%22%5D");
    render(SearchPosts, { limit: 5 });
    await screen.findByText("Found 0 posts");
    expect(screen.getByRole("textbox", { name: "Search posts" })).toHaveValue("headings");
    expect(screen.getByRole("button", { name: "Remove tag others" })).toBeVisible();
    expect(window.history.state).toEqual({ index: 1 });
    expect(fetchIndex).toHaveBeenCalledTimes(1);
  });
  it("normalizes and removes tags without additional downloads", async () => {
    render(SearchPosts, { limit: 5 });
    await screen.findByText("Found 0 posts");
    const input = screen.getByRole("textbox", { name: "Add tag filter" });
    await fireEvent.input(input, { target: { value: " CTF " } });
    await fireEvent.keyDown(input, { key: "Enter" });
    await screen.findByRole("button", { name: "Remove tag ctf" });
    expect(input).toHaveValue("");
    await fireEvent.input(input, { target: { value: "ctf" } });
    await fireEvent.click(screen.getByRole("button", { name: "Add tag" }));
    expect(screen.getAllByRole("button", { name: "Remove tag ctf" })).toHaveLength(1);
    await fireEvent.click(screen.getByRole("button", { name: "Remove tag ctf" }));
    expect(screen.queryByRole("button", { name: "Remove tag ctf" })).not.toBeInTheDocument();
    expect(fetchIndex).toHaveBeenCalledTimes(1);
  });
  it("shows loading placeholders while downloading", async () => {
    let resolve!: (response: Response) => void;
    fetchIndex.mockReturnValueOnce(
      new Promise<Response>(done => {
        resolve = done;
      })
    );
    const { container } = render(SearchPosts, { limit: 2 });
    expect(screen.getByText("Searching...")).toBeVisible();
    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(10);
    resolve(Response.json([]));
    await screen.findByText("Found 0 posts");
    expect(container.querySelector('[data-slot="skeleton"]')).toBeNull();
  });
});
