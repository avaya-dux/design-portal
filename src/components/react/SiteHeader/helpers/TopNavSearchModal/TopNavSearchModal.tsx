import { InfoModal } from "@avaya/neo-react";
import { ReactElement, useEffect, useState } from "react";
import type { PageAstroInstance } from "../..";

import { TopNavSearchModalResults } from "./TopNavSearchModalResults";

import "./TopNavSearchModal.css";

type TopNavSearchModalProps = {
  open: boolean;
  options: PageAstroInstance[];
  children: ReactElement;
  searchModalRef?: React.RefObject<HTMLDivElement>;
};

export const TopNavSearchModal = ({
  open,
  options,
  children,
  searchModalRef,
}: TopNavSearchModalProps) => {
  return (
    <InfoModal
      open={open}
      // HACK: Design of Search Modal does not have a close button, but this prop is required in our Modal Component.
      // Removing close button using CSS instead & will address in React library
      onClose={() => null}
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
            <span className="search-modal__button">Enter</span> to select
          </div>
          <div>
            <span className="search-modal__button">↑</span>
            <span className="search-modal__button">↓</span> to navigate
          </div>
        </div>
      </div>
    </InfoModal>
  );
};
