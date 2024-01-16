import dayjs from "dayjs";
import { Octokit } from "octokit";

export type Repo = "neo-react-library" | "neo-css-library"

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
  repo: Repo,
): Promise<GithubRelease[]> {
  const gitHubRequest = await okto.request(
    "GET /repos/{owner}/{repo}/releases?per_page=20",
    {
      owner: "avaya-dux",
      repo,
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
  repo: Repo,
  tagName: string,
) {
  return await okto
    .request("GET /repos/{owner}/{repo}/releases/tags/{tag}", {
      owner: "avaya-dux",
      repo,
      tag: tagName,
    })
    .then((response) => {
      return response.data.body?.replace(/###/g, "####") || "";
    });
}
