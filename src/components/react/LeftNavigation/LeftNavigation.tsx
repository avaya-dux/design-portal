import { LeftNav } from "@avaya/neo-react";
import { useEffect, useState } from "react";
import type { PageAstroInstance } from "../utils";

import "./LeftNavigationStyleOverrides.css";

/*

Links should change depending on what page we are on

Stop component from flickering on every load

*/

export const LeftNavigation = ({
  components,
  pages,
}: {
  components: boolean;
  pages: PageAstroInstance[];
}) => {
  const [filteredPages, setFilteredPages] = useState<PageAstroInstance[]>([]);

  useEffect(() => {
    if (components) {
      setFilteredPages(
        pages.filter((page) => page.url?.includes("components"))
      );
    }
  }, [components, pages]);

  function navigateToPage(_: string, url: string) {
    const ephemeralLink = document.createElement("a");
    ephemeralLink.href = url;

    document.body.appendChild(ephemeralLink);
    ephemeralLink.click();
  }

  return (
    <>
      <div className="left-navigation" id="left-navigation">
        <LeftNav
          aria-label="Collapsible Navigation Menu"
          onNavigate={navigateToPage}
        >
          {filteredPages.map((page, index) => {
            return (
              <LeftNav.TopLinkItem
                label={page.title}
                href={page.url!}
                key={index}
              ></LeftNav.TopLinkItem>
            );
          })}
        </LeftNav>
      </div>
      <div className="left-navigation-scrim"></div>
    </>
  );
};
