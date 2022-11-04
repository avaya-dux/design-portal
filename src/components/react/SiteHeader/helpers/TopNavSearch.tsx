import { Icon, InfoModal, TextInput } from "@avaya/neo-react";
import { useEffect, useRef, useState } from "react";

import { useDetectOS } from "components/react/utils";

import { closeModal, ModalShortcutKeysType, openModal, TopNavSearchOnKeyDown, TopNavSearchOnKeyUp } from "./TopNavSearchKeyboardHandlers";
import { SearchModalResults } from "./TopNavSearchModalResults";

import "./TopNavSearch.css";

import type { PageAstroInstance } from "../";

export const TopNavSearch = ({ pages }: { pages: PageAstroInstance[] }) => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<PageAstroInstance[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shortcutKeys, setShortcutKeys] = useState<ModalShortcutKeysType>({
    Meta: false,
    Control: false,
    k: false,
  });
  const [indexToFocus, setIndexToFocus] = useState<number>(0);

  const OS = useDetectOS();

  const searchModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (search) {
      const lowerCaseSearch = search.toLowerCase();

      const filteredPages = pages.filter(
        (page) =>
          page.title.toLowerCase().includes(lowerCaseSearch) ||
          page.keywords.toLowerCase().includes(lowerCaseSearch)
      );

      setOptions(filteredPages.length ? filteredPages : []);
    } else {
      setOptions([]);
    }
  }, [search]);

  useEffect(() => {
    window.addEventListener("keydown", (event) =>
      TopNavSearchOnKeyDown(event, setShortcutKeys)
    );
    window.addEventListener("keyup", (event) =>
      TopNavSearchOnKeyUp(event, setShortcutKeys)
    );

    return () => {
      window.removeEventListener("keydown", (event) =>
        TopNavSearchOnKeyDown(event, setShortcutKeys)
      );
      window.removeEventListener("keyup", (event) =>
        TopNavSearchOnKeyUp(event, setShortcutKeys)
      );
    };
  }, []);

  useEffect(() => {
    openModal(OS, shortcutKeys, setIsOpen, setShortcutKeys);
  }, [OS, shortcutKeys]);

  useEffect(() => {
    window.addEventListener("keydown", (event) =>
      closeModal(event, isOpen, setIsOpen)
    );
    return () => {
      window.removeEventListener("keydown", (event) =>
        closeModal(event, isOpen, setIsOpen)
      );
    };
  }, [isOpen]);

  useEffect(() => {
    const closeModalOnClick = (
      event: MouseEvent,
      openModal: React.Dispatch<React.SetStateAction<boolean>>,
      modalRef: React.RefObject<HTMLDivElement>
    ) => {
      if (isOpen && modalRef.current && event.target instanceof HTMLElement) {
        if (
          !modalRef.current.contains(event.target) &&
          !event.target.classList.contains("neo-modal__content")
        )
          openModal(false);
      }
    };

    window.addEventListener("mousedown", (event) =>
      closeModalOnClick(event, setIsOpen, searchModalRef)
    );
    return () => {
      window.removeEventListener("mousedown", (event) =>
        closeModalOnClick(event, setIsOpen, searchModalRef)
      );
    };
  }, [isOpen, searchModalRef]);

  useEffect(() => {
    const arrowNavigation = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();

        if (indexToFocus + 2 > options.length) {
          setIndexToFocus(0);
        } else {
          setIndexToFocus((indexToFocus) => indexToFocus + 1);
        }
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();

        if (indexToFocus - 1 < 0) {
          setIndexToFocus(options.length - 1);
        } else {
          setIndexToFocus((indexToFocus) => indexToFocus - 1);
        }
      }
    };

    window.addEventListener("keydown", arrowNavigation);

    return () => {
      window.removeEventListener("keydown", arrowNavigation);
    };
  }, [options, indexToFocus]);

  return (
    <>
      <Icon
        icon="search"
        aria-label="Search Site"
        onClick={() => setIsOpen(!isOpen)}
        className="search-icon"
      />
      {OS === "macOS" ? (
        <>
          <button className="search__button">⌘</button>
          <button className="search__button">K</button>
        </>
      ) : (
        <button className="search-modal__button">↑</button>
      )}
      <InfoModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title=""
        className="search-modal"
      >
        <div className="link-container" ref={searchModalRef}>
          <TextInput
            aria-label="Search site"
            onChange={(e) => setSearch(e.currentTarget.value)}
            value={search}
            clearable={false}
            endAddon={
              <button
                onClick={() => setIsOpen(false)}
                className="search-modal__button"
              >
                esc
              </button>
            }
            autoFocus
          />
          <div className="search-modal__results">
            <SearchModalResults options={options} indexToFocus={indexToFocus} />
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
    </>
  );
};
