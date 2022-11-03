import { IconButton, Notification, Tooltip } from "@avaya/neo-react";
import { copyTextToClipboard } from "../utils";
import { useState, useRef } from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import vsDark from "prism-react-renderer/themes/vsDark";
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
export const CodeHighlight = ({ code, language = "markdown" }: { code: string, language?: Language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const buttonRef = useRef(null);

  return (
    <div className={styles["code-container"]}>
      <Highlighter code={code} language={language} />
      <Tooltip
        className={styles["copy-button"]}
        label="copy code to clipboard"
        position="left"
      >
        <IconButton
          aria-label="copy content to clipboard"
          icon="copy"
          shape="circle"
          ref={buttonRef}
          onClick={(e) => {
            copyTextToClipboard(code);

            e.currentTarget.blur();

            setIsCopied(true);

            setTimeout(() => {
              setIsCopied(false);
            }, 3000);
          }}
        />
      </Tooltip>

      {isCopied && (
        <div className={styles["code-container__notification-wrapper"]}>
          <Notification
            action={{ onClick: () => setIsCopied(false) }}
            header="Code copied to clipboard"
            icon="copy"
            type="event"
          />
        </div>
      )}
    </div>
  );
};

export const Highlighter = ({
  code,
  language,
}: {
  code: string;
  language: Language;
}) => {
  return (
    <Highlight {...defaultProps} code={code} language={language} theme={vsDark}>
      {({ tokens, getTokenProps }) => (
        <pre>
          {tokens.map((line, i) => (
            <div key={i}>
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
