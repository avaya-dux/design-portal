import { Button, Sheet, TopNav } from "@avaya/neo-react";

import type { AstroInstance } from "astro";
import { useCallback, useEffect, useState } from "react";

import styles from "./SiteHeader.module.css";

export interface PageAstroInstance extends AstroInstance {
  title: string;
  description: string;
}

export const SiteHeader = ({
  pathname,
  pages,
}: {
  pathname: string;
  pages: PageAstroInstance[];
}) => {
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

  const isActiveLink = useCallback(
    (link: string) => pathname.startsWith(link),
    [pathname]
  );

  return (
    <TopNav
      logo={
        <a href="/" aria-label="Homepage">
          <picture>
            <source
              media="(max-width: 1024px)"
              srcSet="/imgs/logo-mobile.svg"
            />
            <source
              media="(max-width: 1440px)"
              srcSet="/imgs/logo-condensed.svg"
            />
            <img src="/imgs/logo-full.svg" alt="Avaya Logo" />
          </picture>
        </a>
      }
      skipNav={
        <TopNav.SkipNav href="#main-content">
          Skip To Main Content
        </TopNav.SkipNav>
      }
    >
      <TopNav.LinkButton
        href="/whats-new"
        active={isActiveLink("/whats-new")}
        rel="prefetch"
      >
        What's New
      </TopNav.LinkButton>

      <TopNav.LinkButton
        href="/guidelines"
        active={isActiveLink("/guidelines")}
        rel="prefetch"
      >
        Guidelines
      </TopNav.LinkButton>

      <TopNav.LinkButton
        href="/components"
        active={isActiveLink("/components")}
        rel="prefetch"
      >
        Components
      </TopNav.LinkButton>

      <TopNav.LinkButton
        href="/icons"
        active={isActiveLink("/icons")}
        rel="prefetch"
      >
        Icons
      </TopNav.LinkButton>

      <TopNav.LinkButton
        href="/faqs"
        active={isActiveLink("/faqs")}
        rel="prefetch"
      >
        FAQs
      </TopNav.LinkButton>

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
    </TopNav>
  );
};
