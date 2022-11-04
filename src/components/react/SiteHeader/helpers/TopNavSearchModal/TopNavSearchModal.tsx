import { InfoModal } from "@avaya/neo-react";
import { ReactElement, useEffect, useRef, useState } from "react";
import type { PageAstroInstance } from "../..";
import { closeSearchModal, ModalShortcutKeysType, openSearchModal, topNavSearchOnKeyDown, topNavSearchOnKeyUp } from "../TopNavSearchKeyboardHandlers";

import { TopNavSearchModalResults } from "./TopNavSearchModalResults";

import { closeSearchModalOnClick } from "../TopNavSearchMouseHandlers";

import './TopNavSearchModal.css'

type TopNavSearchModalProps = {
  open: boolean;
  options: PageAstroInstance[];
  OS?: string,
  children?: ReactElement;
};

export const TopNavSearchModal = ({
  open,
  options,
  OS,
  children,
}: TopNavSearchModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shortcutKeysPressed, setShortcutKeysPressed] = useState<ModalShortcutKeysType>({
    Meta: false,
    Control: false,
    k: false,
  });

  const searchModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    window.addEventListener("keydown", (event) =>
      topNavSearchOnKeyDown(event, setShortcutKeysPressed)
    );
    window.addEventListener("keyup", (event) =>
      topNavSearchOnKeyUp(event, setShortcutKeysPressed)
    );

    return () => {
      window.removeEventListener("keydown", (event) =>
        topNavSearchOnKeyDown(event, setShortcutKeysPressed)
      );
      window.removeEventListener("keyup", (event) =>
        topNavSearchOnKeyUp(event, setShortcutKeysPressed)
      );
    };
  }, []);

  useEffect(() => {
    openSearchModal(OS, shortcutKeysPressed, setIsOpen, setShortcutKeysPressed);
  }, [OS, shortcutKeysPressed]);

  useEffect(() => {
    window.addEventListener("keydown", (event) =>
      closeSearchModal(event, isOpen, setIsOpen)
    );
    return () => {
      window.removeEventListener("keydown", (event) =>
        closeSearchModal(event, isOpen, setIsOpen)
      );
    };
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("mousedown", (event) =>
      closeSearchModalOnClick(event, isOpen, setIsOpen, searchModalRef)
    );
    return () => {
      window.removeEventListener("mousedown", (event) =>
        closeSearchModalOnClick(event, isOpen, setIsOpen, searchModalRef)
      );
    };
  }, [isOpen, searchModalRef]);

  return (
    <InfoModal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title=""
      className="search-modal"
    >
      <div className="link-container" ref={searchModalRef}>
        {children}
        <div className="search-modal__results">
          <TopNavSearchModalResults
            options={options}
          />
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
