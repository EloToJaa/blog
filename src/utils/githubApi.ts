import { GITHUB_TOKEN } from "@config";
import { Octokit } from "@octokit/rest";

class GithubApi {
  private octokit = new Octokit({
    auth: GITHUB_TOKEN,
  });

  public async getAllRepositories() {
    try {
      const response = await this.octokit.repos.listForAuthenticatedUser({
        visibility: "public",
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error message:", error.message);
      }
      return null;
    }
  }

  public async getAuthenticatedUser() {
    try {
      const response = await this.octokit.users.getAuthenticated();
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error message:", error.message);
      }
      return null;
    }
  }

  public async getRepositoryInformation(owner: string, repositoryName: string) {
    try {
      const response = await this.octokit.repos.get({
        owner,
        repo: repositoryName,
        visibility: "public",
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error message:", error.message);
      }
      return null;
    }
  }
}

export default GithubApi;
