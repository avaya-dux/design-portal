import { LeftNav } from "@avaya/neo-react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import {
  isLeftNavigationOpen,
  leftNavToggleButtonRef,
} from "components/react/utils/layoutState";

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

  const toggleButtonRef = useStore(leftNavToggleButtonRef);

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

    const firstFocusableElement =
      leftNavTopElementStyles.display !== "none"
        ? (closeButtonRef.current as HTMLElement)
        : ((toggleButtonRef as RefObject<HTMLButtonElement>)
            .current as HTMLElement);

    function handleKeyDown(event: KeyboardEvent) {
      if (isOpen && event.key === "Escape") {
        isLeftNavigationOpen.set(false);
      }
      if (isOpen) {
        trapFocus(event, firstFocusableElement, lastFocusableElement);
      }
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
          closeButtonRef={closeButtonRef}
          topElementRef={leftNavigationTopElementRef}
          toggleButtonRef={toggleButtonRef as RefObject<HTMLButtonElement>}
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
  closeButtonRef,
  topElementRef,
  toggleButtonRef,
}: {
  isOpen: boolean | undefined;
  closeButtonRef: RefObject<HTMLButtonElement>;
  topElementRef: RefObject<HTMLDivElement>;
  toggleButtonRef: RefObject<HTMLButtonElement>;
}) => {
  useEffect(() => {
    if (closeButtonRef.current && isOpen) {
      // HACK: React LeftNav.TopLinkItem does not currently support using refs
      (
        document
          .querySelector(".left-navigation")
          ?.querySelectorAll(".neo-leftnav__main a")[0] as HTMLElement
      ).focus();
    }

    if (closeButtonRef.current && toggleButtonRef?.current && !isOpen) {
      toggleButtonRef.current?.focus();
    }
  }, [isOpen, toggleButtonRef]);

  return (
    <div className="neo-nav--left" ref={topElementRef}>
      <div className="neo-badge__navbutton">
        <button
          className="neo-badge__navbutton--content neo-btn neo-icon-close"
          id="left-navigation-close"
          aria-label="close left navigation"
          onClick={() => isLeftNavigationOpen.set(false)}
          ref={closeButtonRef}
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
