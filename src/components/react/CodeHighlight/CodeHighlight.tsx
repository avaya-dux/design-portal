import { IconButton, Tooltip } from "@avaya/neo-react";
import { useEffect, useState } from "react";

import type { Language } from "prism-react-renderer";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";

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

export const Highlighter = ({
  code,
  language = "markdown",
}: {
  code: string;
  language?: Language;
}) => {
  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
