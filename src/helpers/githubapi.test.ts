import {
	getGithubReleases,
	getOctokit,
	retrieveGitHubReleaseNotes,
} from "./githubapi";

const key = "put in personal access key";
// These tests are integration tests, thus they are skipped during pipeline runs.
// To run these tests manually, make sure key is valid and remove .skip from describe.skip
describe.skip("integretion test", () => {
	describe("neo-css-libary test", () => {
		test(getGithubReleases.name, async () => {
			const octokit = getOctokit(key);
			const releases = await getGithubReleases(octokit, "neo-css-library");
			console.log(releases);
			// The page size of the api is 20 by default
			expect(releases).toHaveLength(20);
		});

		test(retrieveGitHubReleaseNotes.name, async () => {
			const octokit = getOctokit(key);
			const result = await retrieveGitHubReleaseNotes(
				octokit,
				"neo-css-library",
				"v3.78.0",
			);
			expect(result).not.toBeNull();
		});
	});

	describe("neo-react-libary test", () => {
		test(getGithubReleases.name, async () => {
			const octokit = getOctokit(key);
			const releases = await getGithubReleases(octokit, "neo-react-library");
			console.log(releases);
			// The page size of the api is 20 by default
			expect(releases).toHaveLength(20);
		});

		test(retrieveGitHubReleaseNotes.name, async () => {
			const octokit = getOctokit(key);
			const result = await retrieveGitHubReleaseNotes(
				octokit,
				"neo-react-library",
				"v1.0.4",
			);
			expect(result).not.toBeNull();
		});
	});
});
