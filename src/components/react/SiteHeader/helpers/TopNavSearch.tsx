import { Icon, TextInput } from "@avaya/neo-react";
import { useEffect, useState } from "react";

import { useDetectOS } from "components/react/utils";

import { TopNavSearchModal } from "./TopNavSearchModal/TopNavSearchModal";

import "./TopNavSearch.css";

import type { PageAstroInstance } from "../";

export const TopNavSearch = ({ pages }: { pages: PageAstroInstance[] }) => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<PageAstroInstance[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const OS = useDetectOS();

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
      <TopNavSearchModal open={isOpen} options={options} OS={OS}>
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
      </TopNavSearchModal>
    </>
  );
};
