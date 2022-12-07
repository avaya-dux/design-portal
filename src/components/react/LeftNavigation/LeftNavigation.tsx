import { LeftNav } from "@avaya/neo-react";
import clsx from "clsx";

import { useStore } from "@nanostores/react";

import { isLeftNavigationOpen } from "helpers/layoutState";

import type { PageAstroInstance } from "helpers/types";

import "./LeftNavigationStyleOverride.css";
import { RefObject, useEffect, useRef } from "react";

import { trapFocus } from "../utils";

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

  const isOpen = useStore(isLeftNavigationOpen);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const leftNavigationTopElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // HACK: React LeftNav.TopLinkItem does not currently support using refs
    const lastFocusableElement = document
      .querySelector(".left-navigation")
      ?.querySelectorAll(
        `[href="${pages[pages.length - 1]?.url}"]`
      )[0] as HTMLElement;

    const leftNavTopElementStyles = getComputedStyle(
      leftNavigationTopElementRef.current as Element
    );

    console.log(leftNavTopElementStyles.display);

    const firstFocusableElement =
      leftNavTopElementStyles.display !== "none"
        ? (closeButtonRef.current as HTMLElement)
        : // HACK: I haven't found a better way to get the TopNav Menu Toggle button
          // There is no way that I have found to forward the Ref through the Layout Astro file
          // Same on line 111 below
          (document.getElementById("topnav-menu-toggle") as HTMLElement);

    function handleKeyDown(event: KeyboardEvent) {
      if (isOpen && event.key === "Escape") isLeftNavigationOpen.set(false);

      trapFocus(event, firstFocusableElement, lastFocusableElement);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={clsx(
          "left-navigation",
          isOpen ? "left-navigation--active" : "left-navigation--hidden"
        )}
        id="left-navigation"
      >
        <LeftNavigationTopElement
          isOpen={isOpen}
          buttonRef={closeButtonRef}
          topElementRef={leftNavigationTopElementRef}
        />
        <LeftNav
          aria-label="left-navigation"
          currentUrl={currentUrl}
          onNavigate={handleNavigate}
          isActiveOverride
        >
          {pages.map((page, index) => (
            <LeftNav.TopLinkItem
              key={`${index}${page.title}`}
              label={page.title}
              href={page.url as string}
              className={clsx(
                currentUrl === page.url && "neo-leftnav__main--active"
              )}
            />
          ))}
        </LeftNav>
      </div>
      <div
        className="left-navigation-scrim"
        id="left-navigation-scrim"
        onClick={() => isLeftNavigationOpen.set(false)}
        role="presentation"
      ></div>
    </>
  );
};

const LeftNavigationTopElement = ({
  isOpen,
  buttonRef,
  topElementRef,
}: {
  isOpen: boolean | undefined;
  buttonRef: RefObject<HTMLButtonElement>;
  topElementRef: RefObject<HTMLDivElement>;
}) => {
  useEffect(() => {
    if (buttonRef.current && isOpen) buttonRef.current.focus();

    if (buttonRef.current && !isOpen)
      document.getElementById("topnav-menu-toggle")?.focus();
  }, [isOpen]);

  return (
    <div className="neo-nav--left" ref={topElementRef}>
      <div className="neo-badge__navbutton">
        <button
          className="neo-badge__navbutton--content neo-btn neo-icon-close"
          id="left-navigation-close"
          aria-label="close left navigation"
          onClick={() => isLeftNavigationOpen.set(false)}
          ref={buttonRef}
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
  );
};
