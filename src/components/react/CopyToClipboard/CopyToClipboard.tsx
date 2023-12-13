import { IconButton, Toast } from "@avaya/neo-react";
import { copyTextToClipboard } from "../utils";
import { useState } from "react";

export interface CopyToClipbardProps {
  text: string;
  duration?: number;
  message?: string;
}

export const CopyToClipboard = ({ text, duration, message }: CopyToClipbardProps) => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const toastMessage = message || "Link copied to clipboard";

  const handleClick = () => {
    copyTextToClipboard(text);
    setShowNotification(true);
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
        <Toast icon="copy" duration={duration || 5000}>
          {toastMessage}
        </Toast>
      )}
    </>
  );
};

CopyToClipboard.displayName = "Section Link";
