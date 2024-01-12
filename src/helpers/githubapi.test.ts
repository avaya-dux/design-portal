import {
  getGithubReleases,
  getOctokit,
  retrieveGitHubReleaseNotes,
} from "./githubapi";

const key = "put in personal access key";
// To run these tests manually, make sure key is valid and remove .skip from describe.skip
describe.skip("integretion test", () => {
  test(getGithubReleases.name, async () => {
    const octokit = getOctokit(key);
    const releases = await getGithubReleases(octokit);
    console.log(releases);
    // The page size of the api is 30 by default
    expect(releases).toHaveLength(30);
  });

  test(retrieveGitHubReleaseNotes.name, async () => {
    const octokit = getOctokit(key);
    const result = await retrieveGitHubReleaseNotes(octokit, "v3.78.0");
    expect(result).not.toBeNull();
  });
});
