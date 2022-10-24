import { IconButton, Notification, Tooltip } from "@avaya/neo-react";
import { copyTextToClipboard } from "components/utils";
import { useState, useRef } from "react";

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
export const CodeHighlight = ({ code }: { code: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const buttonRef = useRef(null);

  return (
    <div className={styles["code-container"]}>
      <code>{code}</code>

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
