import { Button, Sheet, TopNav } from "@avaya/neo-react";
import { useEffect, useState } from "react";

import styles from "./TopNavSearch.module.css";

import "./TopNavSearch.css";

import type { PageAstroInstance } from "../";

export const TopNavSearch = ({ pages }: { pages: PageAstroInstance[] }) => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<PageAstroInstance[]>([]);

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
      <TopNav.Search
        onChange={(e) => setSearch(e.currentTarget.value)}
        value={search}
      />

      <Sheet
        className={styles["search-sheet-results"]}
        open={options.length > 0}
        title="Search Results"
      >
        <div className={styles["link-container"]}>
          {options.map((option, i) => (
            <a href={option.url || "/"} key={i}>
              {option.title}
            </a>
          ))}
        </div>

        <Button onClick={() => setSearch("")} size="wide">
          Close
        </Button>
      </Sheet>
    </>
  );
};
