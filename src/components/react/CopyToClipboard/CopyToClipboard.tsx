import { IconButton, removePopupManagerContainer, Tooltip, usePopup } from "@avaya/neo-react";
import { copyTextToClipboard } from "../utils";
import { useEffect } from "react";

export interface CopyToClipbardProps {
  text: string;
  duration?: number;
  message?: string;
}

export const CopyToClipboard = ({
  text,
  duration = 2000,
  message = "Link copied to clipboard",
}: CopyToClipbardProps) => {

  const { mounted, toast } = usePopup("interactive-toast");
  useEffect(() => {
    return () => {
      removePopupManagerContainer();
    };
  }, []);

  const handleClick = () => {
    copyTextToClipboard(text);
    toast({
      message: message,
      duration: duration,
      position: "top",
      icon: "copy",
    });
  };

  return (
    <>
      {mounted && (
        <Tooltip label="Copy link" position="right">
          <IconButton
            variant="tertiary"
            shape="circle"
            icon="link"
            aria-label="copy link to clipboard"
            onClick={handleClick}
          />
        </Tooltip>
      )}
    </>
  );
};

CopyToClipboard.displayName = "CopyToClipboard";
