import type { AstroInstance } from "astro";
import { TopNav } from "@avaya/neo-react";
import { useCallback } from "react";

import { TopNavSearch } from "./helpers";

import "./SiteHeaderStyleOverrides.css";

export interface PageAstroInstance extends AstroInstance {
  title: string;
  keywords: string;
}

/**
 * IMPORTANT: DPv3 is SSRd, and this component requires browser APIs.
 * Thus, in Astro, this component _must_ be rendered client-side via:
 * `client:*`
 *
 * @example
 * <SiteHeader pathname={Astro.url.pathname} pages={pages} client:load />
 *
 * @see `layout/Layout.astro` for implementation details
 */
export const SiteHeader = ({
  pathname,
  pages,
}: {
  pathname: string;
  pages: PageAstroInstance[];
}) => {
  const isActiveLink = useCallback(
    (link: string) => pathname.startsWith(link),
    [pathname]
  );

  return (
    <TopNav
      logo={<Logo />}
      search={<TopNavSearch pages={pages} />}
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
        Docs
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
    </TopNav>
  );
};

const Logo = () => (
  <a href="/" aria-label="Homepage">
    <picture>
      <source
        media="(max-width: 799px) and (prefers-color-scheme: dark)"
        srcSet="/imgs/logo-mobile-dark.svg"
      />
      <source media="(max-width: 799px)" srcSet="/imgs/logo-mobile-light.svg" />
      <source
        media="(max-width: 1279px) and (prefers-color-scheme: dark)"
        srcSet="/imgs/logo-condensed-dark.svg"
      />
      <source
        media="(max-width: 1279px)"
        srcSet="/imgs/logo-condensed-light.svg"
      />
      <source
        media="(min-width: 1280px) and (prefers-color-scheme: dark)"
        srcSet="/imgs/logo-full-dark.svg"
      />
      <img src="/imgs/logo-full-light.svg" alt="Avaya Logo" />
    </picture>
  </a>
);
