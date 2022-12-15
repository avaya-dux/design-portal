import {
  IconButton,
  Notification,
  Tooltip,
  PopupId,
  PopupPosition,
  removePopupManagerContainer,
  usePopup,
} from "@avaya/neo-react";
import { copyTextToClipboard } from "../utils";
import { useState, useRef, useEffect } from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";
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
  code,
  language = "markdown",
}: {
  code: string;
  language?: Language;
}) => {
  const { notify, remove } = usePopup("interactive-toast");
  useEffect(() => {
    return () => {
      removePopupManagerContainer();
    };
  }, []);
  const [isCopied, setIsCopied] = useState(false);

  const notificationRef = useRef(
    <Notification
      action={{ onClick: () => setIsCopied(false) }}
      header="Code copied to clipboard"
      icon="copy"
      type="event"
    />
  );
  const popupRef = useRef<
    { id: PopupId; position: PopupPosition } | undefined
  >();

  const buttonRef = useRef(null);

  useEffect(() => {
    if (isCopied) {
      popupRef.current = notify({
        node: notificationRef.current,
        position: "bottom-left",
      });
    } else {
      if (popupRef.current) {
        remove(popupRef.current.id, popupRef.current.position);
      }
    }
  }, [isCopied, notify, remove]);

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
