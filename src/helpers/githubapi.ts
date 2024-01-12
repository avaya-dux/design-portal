import dayjs from "dayjs";
import { Octokit } from "octokit";

export interface GithubRelease {
  version: string;
  tag: string;
  date: string;
}

export function getOctokit(apiKey?: string) {
  return new Octokit({
    auth: import.meta.env.PUBLIC_GITHUB_PAT || apiKey,
  });
}

export async function getGithubReleases(
  okto: Octokit,
): Promise<GithubRelease[]> {
  const gitHubRequest = await okto.request(
    "GET /repos/{owner}/{repo}/releases?per_page=20",
    {
      owner: "avaya-dux",
      repo: "neo-css-library",
    },
  );

  return gitHubRequest.data.map(
    (release: { tag_name: string; published_at: string }) => {
      return {
        version: release.tag_name.replace("v", ""),
        tag: release.tag_name,
        date: dayjs(release.published_at?.replace("T", " ")).format(
          "MMMM DD, YYYY",
        ),
      };
    },
  );
}

export async function retrieveGitHubReleaseNotes(
  okto: Octokit,
  tagName: string,
) {
  return await okto
    .request("GET /repos/{owner}/{repo}/releases/tags/{tag}", {
      owner: "avaya-dux",
      repo: "neo-css-library",
      tag: tagName,
    })
    .then((response) => {
      return response.data.body?.replace(/###/g, "####") || "";
    });
}
