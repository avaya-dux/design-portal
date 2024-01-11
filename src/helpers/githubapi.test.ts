import {
  getGithubReleases,
  getOctokit,
  retrieveGitHubReleaseNotes,
} from "./githubapi";

const key =
  "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";

// To run these tests manually, make sure key is valid and remove .skip from describe.skip
describe.skip("integretion test", () => {
  test(getGithubReleases.name, async () => {
    const octokit = getOctokit(key);
    const result = await getGithubReleases(octokit);
    console.log(result);
    expect(result).toHaveLength(30);
  });

  test(retrieveGitHubReleaseNotes.name, async () => {
    const octokit = getOctokit(key);
    const result = await retrieveGitHubReleaseNotes(octokit, "v3.78.0");
    expect(result).not.toBeNull()
  });
});
