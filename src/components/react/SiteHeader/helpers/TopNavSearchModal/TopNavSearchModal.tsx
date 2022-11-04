import { InfoModal } from "@avaya/neo-react";
import { ReactElement, useEffect, useState } from "react";
import type { PageAstroInstance } from "../..";

import { TopNavSearchModalResults } from "./TopNavSearchModalResults";

import "./TopNavSearchModal.css";

type TopNavSearchModalProps = {
  open: boolean;
  options: PageAstroInstance[];
  children?: ReactElement;
  searchModalRef?: React.RefObject<HTMLDivElement>;
};

export const TopNavSearchModal = ({
  open,
  options,
  children,
  searchModalRef,
}: TopNavSearchModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <InfoModal
      open={isOpen}
      // HACK: Design of Search Modal does not have a close button, but this prop is required in our Modal Component.
      // Removing close button using CSS instead & will address in React library
      // eslint-disable-next-line
      onClose={() => {}}
      title=""
      className="search-modal"
    >
      <div className="link-container" ref={searchModalRef}>
        {children}
        <div className="search-modal__results">
          <TopNavSearchModalResults options={options} />
        </div>
        <div className="search-modal__keyboard-nav">
          <div>
            <button className="search-modal__button">Enter</button> to select
          </div>
          <div>
            <button className="search-modal__button">↑</button>
            <button className="search-modal__button">↓</button> to navigate
          </div>
        </div>
      </div>
    </InfoModal>
  );
};
