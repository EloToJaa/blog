import GithubAction from "./github.ts";
import SearchAction from "./search.ts";

export const server = {
  search: SearchAction,
  github: GithubAction,
};
