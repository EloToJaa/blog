import { getCollection } from "astro:content";
import { Effect } from "effect";
import { publishedPosts } from "./posts";
export const loadPosts = () =>
  Effect.runPromise(
    Effect.tryPromise({
      try: () => getCollection("blog"),
      catch: cause => new Error("Unable to load blog content", { cause }),
    }).pipe(Effect.map(posts => publishedPosts(posts)))
  );
