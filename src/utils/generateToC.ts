import type { MarkdownHeading } from "astro";

export type TocItem = MarkdownHeading & {
  children: TocItem[];
  numbers: number[];
};

type TocOpts = {
  minHeadingLevel: number;
  maxHeadingLevel: number;
};

/** Convert the flat headings array generated by Astro into a nested tree structure. */
export function generateToC(
  headings: MarkdownHeading[],
  { minHeadingLevel, maxHeadingLevel }: TocOpts
) {
  headings = headings.filter(
    ({ depth }) => depth >= minHeadingLevel && depth <= maxHeadingLevel
  );
  const toc: TocItem[] = [];
  for (const heading of headings)
    injectChild(toc, { ...heading, children: [], numbers: [] });

  numberItems(toc);

  return toc;
}

/** Number items recursively for better readability */
function numberItems(items: TocItem[], numberStack: number[] = []) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    item.numbers = [...numberStack, i + 1];
    numberItems(item.children, item.numbers);
  }
}

/** Inject a ToC entry as deep in the tree as its `depth` property requires. */
function injectChild(items: TocItem[], item: TocItem): void {
  const lastItem = items.at(-1);
  if (!lastItem || lastItem.depth >= item.depth) {
    items.push(item);
  } else {
    return injectChild(lastItem.children, item);
  }
}
