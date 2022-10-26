import { IconButton, Notification } from "@avaya/neo-react";
import { copyTextToClipboard } from "../utils";
import { useState } from "react";

import styles from "./SectionLink.module.css";

export interface SectionLinkProps {
  url: string;
}

export const SectionLink = ({ url }: SectionLinkProps) => {
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const handleClick = () => {
    copyTextToClipboard(url);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 1500);
  };

  return (
    <>
      <IconButton
        variant="tertiary"
        shape="circle"
        icon="link"
        aria-label="hyperlink icon"
        onClick={handleClick}
      />

      {showNotification && (
        <div className={styles["section-link__notification-wrapper"]}>
          <Notification
            icon="copy"
            type="event"
            header="Link copied to clipboard"
          />
        </div>
      )}
    </>
  );
};

SectionLink.displayName = "Section Link";
