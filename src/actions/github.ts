import GithubApi from "@utils/githubApi";
import { defineAction, z } from "astro:actions";

const api = new GithubApi();

export default defineAction({
  accept: "json",
  input: z.object({
    after: z.string().nullable(),
    pageSize: z.number().int().min(1).max(50).default(5),
  }),
  handler: async ({ after, pageSize }) => {
    const response = await api.getAllRepositories(
      pageSize,
      after === "" || after === "null" ? null : after
    );

    return response;
  },
});
