import { IconButton, Tooltip } from "@avaya/neo-react";
import { Highlight } from "prism-react-renderer";
import { useEffect, useState } from "react";

import { copyTextToClipboard } from "../utils";
import styles from "./CodeHighlight.module.css";

/**
 * The CodeHighlight component shows a code example and provides a "copy" (to clipboard) button.
 *
 * @example
 * const react = `<Button>default</Button>`;
 * return (<CodeHighlight code={react} />);
 *
 * @example
 * // Astro implementation requires `client:load` for the button functionality to work.
 * <CodeHighlight code="npm install @avaya/neo" client:load />
 */
export const CodeHighlight = ({
	active,
	code,
	language = "markdown",
	tooltipId,
}: {
	active: boolean;
	code: string;
	language?: Language;
	tooltipId?: string;
}) => {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (!active) {
			setIsCopied(false);
		}
		return () => {
			setIsCopied(false);
		};
	}, [active]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: reset value if displayed code changes
	useEffect(() => {
		setIsCopied(false);
	}, [code]);

	return (
		<div className={styles["code-container"]}>
			<Highlighter code={code} language={language} />
			<Tooltip
				tooltipDivProps={{ id: tooltipId }}
				className={styles["copy-button"]}
				label={isCopied ? "Copied" : "Copy code to clipboard"}
				position="left"
			>
				<IconButton
					aria-label="copy content to clipboard"
					icon="copy"
					shape="circle"
					onClick={(e) => {
						copyTextToClipboard(code);
						e.currentTarget.blur();
						setIsCopied(true);
					}}
				/>
			</Tooltip>
		</div>
	);
};

// copy-pasted from: https://github.com/FormidableLabs/prism-react-renderer/blob/c914fdea48625ba59c8022174bb3df1ed802ce4d/packages/generate-prism-languages/index.ts#L9-L23
type Language =
	| "jsx"
	| "tsx"
	| "swift"
	| "kotlin"
	| "objectivec"
	| "js-extras"
	| "reason"
	| "rust"
	| "graphql"
	| "yaml"
	| "go"
	| "cpp"
	| "markdown";

export const Highlighter = ({
	code,
	language = "markdown",
}: {
	code: string;
	language?: Language;
}) => {
	return (
		<Highlight code={code} language={language}>
			{({ tokens, getLineProps, getTokenProps }) => (
				<pre>
					{tokens.map((line, i) => (
						<div key={`highlight-${i}`} {...getLineProps({ line, key: i })}>
							{line.map((token, key) => (
								<span
									key={`highlight-span-${i}`}
									{...getTokenProps({ token, key })}
								/>
							))}
						</div>
					))}
				</pre>
			)}
		</Highlight>
	);
};
