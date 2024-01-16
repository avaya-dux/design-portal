import { getOctokit, retrieveGitHubReleaseNotes, type Repo } from "helpers";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./ChangelogNotes.module.css";

export const ChangelogNotes = ({
  githubReleaseTag,
  repo,
}: {
  githubReleaseTag: string;
  repo:Repo;
}) => {
  const [releaseNotes, setReleaseNotes] = useState<string>();

  useEffect(() => {
    async function retrieveCSSLibraryGitHubReleaseNotes(tagName: string) {
      const octokit = getOctokit();
      const result = await retrieveGitHubReleaseNotes(octokit, repo, tagName);
      // replace host address, e.g. http://design.avaya.com/, with /
      setReleaseNotes(result.replaceAll(/https:\/\/.*com\//gi, "/"));
    }
    if (githubReleaseTag) {
      retrieveCSSLibraryGitHubReleaseNotes(githubReleaseTag);
    }
  }, [githubReleaseTag, repo]);

  return (
    <div className={styles.changes__wrapper}>
      <ReactMarkdown>{releaseNotes}</ReactMarkdown>
    </div>
  );
};
