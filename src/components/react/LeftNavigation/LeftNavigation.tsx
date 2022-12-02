import clsx from "clsx";

import { LeftNav } from "@avaya/neo-react";

import type { PageAstroInstance } from "helpers/types";

import "./LeftNavigationStyleOverride.css";

export const LeftNavigation = ({
  pages,
  currentUrl,
}: {
  pages: PageAstroInstance[];
  currentUrl: string;
}) => {
  const handleNavigate = (id: string, url: string) => {
    window.location.href = url;
  };

  return (
    <>
      <div className="left-navigation" id="left-navigation">
        <div className="neo-nav--left">
          <div className="neo-badge__navbutton">
            <button
              className="neo-badge__navbutton--content neo-btn neo-icon-close"
              id="left-navigation-close"
              aria-label="close left navigation"
            ></button>
          </div>
          <a href="/" aria-label="Homepage">
            <picture>
              <source
                media="(max-width: 799px) and (prefers-color-scheme: dark)"
                srcSet="/imgs/logo-mobile-dark.svg"
              />
              <source
                media="(max-width: 799px)"
                srcSet="/imgs/logo-mobile-light.svg"
              />
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
        </div>
        <LeftNav
          aria-label="left-navigation"
          currentUrl={currentUrl}
          onNavigate={handleNavigate}
          isActiveOverride
        >
          {pages.map((page, index) => (
            <LeftNav.TopLinkItem
              key={index}
              label={page.title}
              href={page.url as string}
              className={clsx(
                currentUrl === page.url && "neo-leftnav__main--active"
              )}
            />
          ))}
        </LeftNav>
      </div>
      <div className="left-navigation-scrim" id="left-navigation-scrim"></div>
    </>
  );
};
