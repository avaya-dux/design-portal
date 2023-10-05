import { TopNav } from "@avaya/neo-react";
import { useCallback, useEffect, useRef } from "react";

import { isLeftNavigationOpen, leftNavToggleButtonRef } from "components/react/utils/layoutState";

import type { PageAstroInstance } from "helpers/types";

import { TopNavSearch } from "./helpers";

import "./SiteHeaderStyleOverrides.css";
import { useStore } from "@nanostores/react";

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
  userAgent,
  pages,
  showToggleBtn = false,
}: {
  pathname: string;
  userAgent: string;
  pages: PageAstroInstance[];
  showToggleBtn?: boolean;
}) => {
  const isActiveLink = useCallback(
    (link: string) => pathname.startsWith(link),
    [pathname],
  );

  const isOpen = useStore(isLeftNavigationOpen);

  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (toggleButtonRef.current) {
      leftNavToggleButtonRef.set(toggleButtonRef);
    }
  }, []);

  return (
    <TopNav
      logo={<Logo />}
      search={<TopNavSearch pages={pages} userAgent={userAgent} />}
      skipNav={
        <TopNav.SkipNav href="#main-content">
          Skip To Main Content
        </TopNav.SkipNav>
      }
      menuToggleBtn={
        showToggleBtn ? (
          <TopNav.IconButton
            id="topnav-menu-toggle"
            aria-label={
              isOpen ? "close left navigation" : "open left navigation"
            }
            className="topnav-menu-toggle"
            icon={isOpen ? "close" : "menu"}
            onClick={() => isLeftNavigationOpen.set(!isOpen)}
            ref={toggleButtonRef}
          />
        ) : undefined
      }
      sticky
    >
      <TopNav.LinkButton
        href="/docs/setup"
        active={isActiveLink("/docs")}
        rel="prefetch"
      >
        Docs
      </TopNav.LinkButton>

      <TopNav.LinkButton
        href="/guidelines/overview"
        active={isActiveLink("/guidelines")}
        rel="prefetch"
      >
        Guidelines
      </TopNav.LinkButton>

      <TopNav.LinkButton
        href="/accessibility/principles"
        active={isActiveLink("/accessibility")}
        rel="prefetch"
      >
        Accessibility
      </TopNav.LinkButton>

      <TopNav.LinkButton
        href="/components/accordion"
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
        media="(max-width: 320px) and (prefers-color-scheme: dark)"
        srcSet="/imgs/logo-mobile-dark.svg"
      />
      <source
        media="(max-width: 320px)"
        srcSet="/imgs/logo-mobile-light.svg"
      />

      <source
        media="(min-width: 321px) and (max-width: 799px) and (prefers-color-scheme: dark)"
        srcSet="/imgs/logo-condensed-dark.svg"
      />
      <source media="(min-width: 321px) and (max-width: 799px)" srcSet="/imgs/logo-condensed-light.svg" />

      <source
        media="(min-width: 800px) and (max-width: 1279px) and (prefers-color-scheme: dark)"
        srcSet="/imgs/logo-full-dark.svg"
      />
      <source
        media="(min-width: 800px) and (max-width: 1279px)"
        srcSet="/imgs/logo-full-light.svg"
      />

      <source
        media="(min-width: 1280px) and (prefers-color-scheme: dark)"
        srcSet="/imgs/logo-full-dark.svg"
      />
      <img src="/imgs/logo-full-light.svg" alt="Avaya Logo" />
    </picture>
  </a>
);
