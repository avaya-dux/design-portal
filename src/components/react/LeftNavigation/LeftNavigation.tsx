import { LeftNav } from "@avaya/neo-react";
import { useEffect, useState } from "react";
import type { PageAstroInstance } from "../utils";

import "./LeftNavigationStyleOverrides.css";

/*

Links should change depending on what page we are on

*/

export const LeftNavigation = ({
  url,
  pages,
}: {
  url: string;
  pages: PageAstroInstance[];
}) => {
  console.log(url);

  const [filteredPages, setFilteredPages] = useState<PageAstroInstance[]>([]);

  useEffect(() => {
    if (url.includes("components")) {
      setFilteredPages(pages.filter(page => page.url?.includes("components")))
    }
  }, [pages]);

  return (
    <div className="left-navigation">
      <LeftNav aria-label="Collapsible Navigation Menu">
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
  );
};
