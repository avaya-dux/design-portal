import { getOctokit, retrieveGitHubReleaseNotes } from "helpers";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./ChangelogNotes.css";

export const ChangelogNotes = ({
  githubReleaseTag,
}: {
  githubReleaseTag: string;
}) => {
  const [releaseNotes, setReleaseNotes] = useState<string>();

  useEffect(() => {
    async function retrieveCSSLibraryGitHubReleaseNotes(tagName: string) {
      const key =
        "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";
      const octokit = getOctokit(key);
      const result = await retrieveGitHubReleaseNotes(octokit, tagName);

      setReleaseNotes(result);
    }
    if (githubReleaseTag) {
      retrieveCSSLibraryGitHubReleaseNotes(githubReleaseTag);
    }
  }, [githubReleaseTag]);

  return (
    <div className="changes__wrapper">
      <ReactMarkdown>{releaseNotes}</ReactMarkdown>
    </div>
  );
};
