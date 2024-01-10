import { GITHUB_TOKEN } from "@config";
import { graphql } from "@octokit/graphql";
import type { Repository, User } from "@octokit/graphql-schema";

export type AllRepositories = {
  viewer: {
    repositories: {
      nodes: Repository[];
      pageInfo: {
        endCursor: string;
        hasNextPage: boolean;
      };
    };
  };
};

export type AuthenticatedUser = {
  viewer: User;
};

export type RepositoryInformation = {
  repository: Repository;
};

class GithubApi {
  private graphqlWithAuth;

  constructor() {
    this.graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `token ${GITHUB_TOKEN}`,
      },
    });
  }

  public async getAllRepositories(
    pageSize: number = 10,
    after: string | null = null
  ) {
    const query = `
    query($after: String, $pageSize: Int) {
      viewer {
        repositories(first: $pageSize, privacy: PUBLIC, after: $after) {
          nodes {
            name
            nameWithOwner
            description
            url
            stargazerCount
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `;

    try {
      const response = await this.graphqlWithAuth<AllRepositories>(query, {
        after,
        pageSize,
      });
      return {
        repositories: response.viewer.repositories.nodes,
        endCursor: response.viewer.repositories.pageInfo.endCursor,
        hasNextPage: response.viewer.repositories.pageInfo.hasNextPage,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      }
      return null;
    }
  }

  public async getAuthenticatedUser() {
    const query = `
      query {
        viewer {
          login
        }
      }
    `;

    try {
      const response = await this.graphqlWithAuth<AuthenticatedUser>(query);
      return response.viewer.login;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      }
      return null;
    }
  }

  public async getRepositoryInformation(owner: string, repositoryName: string) {
    const query = `
      query($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          name
          nameWithOwner
          description
          url
          stargazerCount
          visibility
          repositoryTopics(first: 10) {
            edges {
              node {
                topic {
                  id
                  name
                  url
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await this.graphqlWithAuth<RepositoryInformation>(
        query,
        {
          owner,
          name: repositoryName,
        }
      );
      return response.repository;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      }
      return null;
    }
  }
}

export default GithubApi;
