import { TopNav } from "@avaya/neo-react";
import { useCallback, useState } from "react";

export const SiteHeader = ({ pathname }: { pathname: string }) => {
  const [, setSearch] = useState("");

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

      <TopNav.Search onChange={(e) => setSearch(e.currentTarget.value)} />
    </TopNav>
  );
};
