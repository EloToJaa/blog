import { Octokit } from "@octokit/rest";
import { apiJson } from "@utils/api";
import type { APIRoute } from "astro";

export const prerender = false;

const octokit = new Octokit({
  auth: "TOKEN",
});

async function getAllRepos() {
  try {
    // Get all repositories for the authenticated user
    const response = await octokit.repos.listForAuthenticatedUser();

    console.log("Repositories:", response.data);
  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

export const GET: APIRoute = async ({ url }) => {
  await getAllRepos();

  return new Response(JSON.stringify({ results: 1 }), apiJson);
};
