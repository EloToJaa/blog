import { githubGetReposSchema } from "@schema/github";
import { apiJson } from "@utils/api";
import GithubApi from "@utils/githubApi";
import type { APIRoute } from "astro";

export const prerender = false;

const api = new GithubApi();

export const GET: APIRoute = async ({ url }) => {
  const result = githubGetReposSchema.safeParse(
    Object.fromEntries(url.searchParams.entries())
  );
  console.log(result);
  if (!result.success) {
    return new Response(
      JSON.stringify({ error: result.error.issues }),
      apiJson
    );
  }
  const { after, pageSize } = result.data;

  const response = await api.getAllRepositories(
    pageSize,
    after === "" || after === "null" ? null : after
  );

  return new Response(JSON.stringify(response), apiJson);
};
