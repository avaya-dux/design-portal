import { IconButton, Tooltip } from "@avaya/neo-react";

import styles from "./CodeHighlight.module.css";

export const CodeHighlight = ({ code }: { code: string }) => {
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
          onClick={() => {
            navigator.clipboard.writeText(code);
          }}
        />
      </Tooltip>
    </div>
  );
};
