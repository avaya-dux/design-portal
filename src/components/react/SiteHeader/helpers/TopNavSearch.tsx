import { Icon, TextInput } from "@avaya/neo-react";
import { useEffect, useRef, useState } from "react";

import { useDetectOS } from "components/react/utils";

import { TopNavSearchModal } from "./TopNavSearchModal/TopNavSearchModal";

import "./TopNavSearch.css";

import type { PageAstroInstance } from "../";
import {
  closeSearchModal,
  ModalShortcutKeysType,
  openSearchModal,
  topNavSearchOnKeyDown,
  topNavSearchOnKeyUp,
} from "./TopNavSearchKeyboardHandlers";
import { closeSearchModalOnClick } from "./TopNavSearchMouseHandlers";

export const TopNavSearch = ({ pages }: { pages: PageAstroInstance[] }) => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<PageAstroInstance[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shortcutKeysPressed, setShortcutKeysPressed] =
    useState<ModalShortcutKeysType>({
      Meta: false,
      Control: false,
      k: false,
    });

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

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen]);

  return (
    <>
      <Icon
        icon="search"
        aria-label="Search Site"
        onClick={() => setIsOpen(true)}
        className="search-icon"
      />
      {OS === "macOS" ? (
        <button className="search__button">⌘ K</button>
      ) : (
        <button className="search__button">Ctrl K</button>
      )}
      <TopNavSearchModal
        open={isOpen}
        options={options}
        searchModalRef={searchModalRef}
      >
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
          type="search"
        />
      </TopNavSearchModal>
    </>
  );
};
