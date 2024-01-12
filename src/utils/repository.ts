import type {
  RepositoryTopic,
  RepositoryTopicConnection,
} from "@octokit/graphql-schema";

export const getRepositoryTopics = (
  repositoryTopics: RepositoryTopicConnection
): RepositoryTopic[] => {
  return (repositoryTopics.nodes ?? [])
    .filter(t => !!t)
    .map(t => t as RepositoryTopic);
};
