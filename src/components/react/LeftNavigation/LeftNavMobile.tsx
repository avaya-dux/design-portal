import { LeftNav } from "@avaya/neo-react";
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
  const accessibilityPages = allPages.filter(
    (page) => page.url?.includes("accessibility"),
  );

  const componentPages = allPages.filter(
    (page) => page.url?.includes("components"),
  );

  const docsPages = allPages.filter((page) => page.url?.includes("docs"));

  const guidelinesPages = allPages.filter(
    (page) => page.url?.includes("guidelines"),
  );

  return (
    <LeftNav
      aria-label="left-navigation"
      currentUrl={currentUrl}
      onNavigate={onNavigate}
      isActiveOverride
    >
      <LeftNav.NavCategory label="Docs">
        {docsPages.map((page, index) => (
          <LeftNav.LinkItem key={`doc-${index}`} href={page.url as string}>
            {page.title}
          </LeftNav.LinkItem>
        ))}
      </LeftNav.NavCategory>

      <LeftNav.NavCategory label="Guidelines">
        {guidelinesPages.map((page, index) => (
          <LeftNav.LinkItem
            key={`guidelines-${index}`}
            href={page.url as string}
          >
            {page.title}
          </LeftNav.LinkItem>
        ))}
      </LeftNav.NavCategory>

      <LeftNav.NavCategory label="Accessibility">
        {accessibilityPages.map((page, index) => (
          <LeftNav.LinkItem
            key={`accessibility-${index}`}
            href={page.url as string}
          >
            {page.title}
          </LeftNav.LinkItem>
        ))}
      </LeftNav.NavCategory>

      <LeftNav.NavCategory label="Components">
        {componentPages.map((page, index) => (
          <LeftNav.LinkItem
            key={`${index}${page.title}`}
            href={page.url as string}
          >
            {page.title}
          </LeftNav.LinkItem>
        ))}
      </LeftNav.NavCategory>

      <LeftNav.TopLinkItem key="theIcons" label="Icons" href="/icons" />
    </LeftNav>
  );
};
