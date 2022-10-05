import { Button, Sheet, TopNav } from "@avaya/neo-react";
import { useEffect, useState } from "react";

import type { AstroInstance } from "astro";

import styles from "./TopNavSearch.module.css";

export interface PageAstroInstance extends AstroInstance {
  title: string;
  description: string;
}

export const TopNavSearch = ({ pages }: { pages: PageAstroInstance[] }) => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<PageAstroInstance[]>([]);

  useEffect(() => {
    if (search) {
      const lowerCaseSearch = search.toLowerCase();

      const filteredPages = pages.filter(
        (page) =>
          page.title.toLowerCase().includes(lowerCaseSearch) ||
          page.description.toLowerCase().includes(lowerCaseSearch)
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
        clearable={false}
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
