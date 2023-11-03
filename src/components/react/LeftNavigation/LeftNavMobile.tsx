import { LeftNav } from "@avaya/neo-react";
import clsx from "clsx";


import type { PageAstroInstance } from "helpers/types";

export const LeftNavMobile = ({
  allPages,
  currentUrl,
  onNavigate,
}: {
  allPages: PageAstroInstance[];
  currentUrl: string;
  onNavigate?: (id: string, url: string) => void;
  }) => {
    // const accessibilityPages = allPages.filter(
    //   (page) => page.url?.includes("accessibility"),
    // );

    // const componentPages = allPages.filter(
    //   (page) => page.url?.includes("components"),
    // );

    const docsPages = allPages.filter(
      (page) => page.url?.includes("docs"),
    );

    // const guidelinesPages = allPages.filter(
    //   (page) => page.url?.includes("guidelines"),
    // );

  return (
    <LeftNav
      aria-label="left-navigation"
      currentUrl={currentUrl}
      onNavigate={onNavigate}
      isActiveOverride
    >
      <LeftNav.NavCategory label="Docs">
        {docsPages.map((page, index) => (
          <LeftNav.LinkItem
            key={`${index}${page.title}`}
            href={page.url as string}
            // className={clsx(
            //   currentUrl === page.url && "neo-leftnav__main--active",
            // )}
          >
            {page.title}
          </LeftNav.LinkItem>
        ))}
      </LeftNav.NavCategory>
    </LeftNav>
  );
};
