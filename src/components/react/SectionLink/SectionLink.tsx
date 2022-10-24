import { IconButton, Notification } from "@avaya/neo-react";
import { copyTextToClipboard } from "../utils";
import { useState } from "react";

import styles from "./SectionLink.module.css";

export interface SectionLinkProps {
  id: string;
  url: string;
}

export const SectionLink = ({ id, url }: SectionLinkProps) => {
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const sectionURL = `${url}#${id}`;

  const handleClick = () => {
    copyTextToClipboard(sectionURL);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 1500);
  };

  return (
    <>
      <a href={sectionURL} className={styles["section-link"]}>
        <IconButton
          variant="tertiary"
          shape="circle"
          icon="link"
          aria-label="hyperlink icon"
          onClick={() => handleClick()}
        />
      </a>

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
