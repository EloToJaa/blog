import SearchPosts from "./SearchPosts.svelte";
import { fireEvent, render, screen, waitFor } from "@testing-library/svelte";
import { actions } from "astro:actions";
import { beforeEach, describe, expect, it, vi } from "vitest";

const search = vi.mocked(actions.search);

beforeEach(() => {
  search.mockReset();
  search.mockResolvedValue({ data: { results: [] }, error: undefined });
  window.history.replaceState({ index: 1 }, "", "/search");
});

describe("search controls", () => {
  it("restores the query and tag badges from the URL", async () => {
    window.history.replaceState(
      { index: 1 },
      "",
      "/search?q=headings&tags=%5B%22others%22%5D"
    );
    render(SearchPosts, { limit: 5 });
    await waitFor(() =>
      expect(search).toHaveBeenCalledWith({
        searchPhrase: "headings",
        tags: ["others"],
        limit: 5,
      })
    );
    expect(screen.getByRole("searchbox", { name: "Search posts" })).toHaveValue(
      "headings"
    );
    expect(
      screen.getByRole("button", { name: "Remove tag others" })
    ).toBeVisible();
    expect(window.history.state).toEqual({ index: 1 });
  });

  it("normalizes tags added with Enter, prevents duplicates, and removes filters", async () => {
    render(SearchPosts, { limit: 5 });
    await screen.findByText("Found 0 posts");
    const input = screen.getByRole("textbox", { name: "Add tag filter" });
    await fireEvent.input(input, { target: { value: "  CTF  " } });
    await fireEvent.keyDown(input, { key: "Enter" });
    await screen.findByRole("button", { name: "Remove tag ctf" });
    expect(search).toHaveBeenLastCalledWith({
      searchPhrase: "",
      tags: ["ctf"],
      limit: 5,
    });
    expect(input).toHaveValue("");
    const calls = search.mock.calls.length;
    await fireEvent.input(input, { target: { value: "ctf" } });
    await fireEvent.click(
      screen.getByRole("button", { name: "Add tag", exact: true })
    );
    expect(search).toHaveBeenCalledTimes(calls);
    await fireEvent.click(
      screen.getByRole("button", { name: "Remove tag ctf" })
    );
    await waitFor(() =>
      expect(search).toHaveBeenLastCalledWith({
        searchPhrase: "",
        tags: [],
        limit: 5,
      })
    );
    expect(
      screen.queryByRole("button", { name: "Remove tag ctf" })
    ).not.toBeInTheDocument();
  });

  it("shows loading placeholders until the search resolves", async () => {
    let resolveSearch: (value: {
      data: { results: [] };
      error: undefined;
    }) => void = () => {};
    search.mockReturnValueOnce(
      new Promise(resolve => {
        resolveSearch = resolve;
      })
    );
    const { container } = render(SearchPosts, { limit: 2 });
    expect(screen.getByText("Searching...")).toBeVisible();
    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(
      10
    );
    resolveSearch({ data: { results: [] }, error: undefined });
    await screen.findByText("Found 0 posts");
    expect(container.querySelector('[data-slot="skeleton"]')).toBeNull();
  });
});
