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
            const key = "";
            const octokit = getOctokit(key);
            const result = await retrieveGitHubReleaseNotes(octokit, tagName);
            // replace host address, e.g. http://design.avaya.com/, with /
            setReleaseNotes(result.replaceAll(/https:\/\/.*com\//gi, "/"));
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
