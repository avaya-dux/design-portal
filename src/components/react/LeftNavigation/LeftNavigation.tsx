import { useCallback, useEffect, useRef } from "react";
import { LeftNav } from "@avaya/neo-react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import {
  isLeftNavigationOpen,
  leftNavToggleButtonRef,
} from "components/react/utils/layoutState";
import type { PageAstroInstance } from "helpers/types";

import { trapFocus, useWindowSize } from "../utils";

import "./LeftNavigationStyleOverride.css";
import { LeftNavMobile } from ".";

export const LeftNavigation = ({
  allPages,
  filteredpages,
  currentUrl,
}: {
  allPages: PageAstroInstance[];
  filteredpages: PageAstroInstance[];
  currentUrl: string;
}) => {
  const handleNavigate = (_: string, url: string) => {
    window.location.href = url;
  };

  console.log({ allPages });

  const isOpen = useStore(isLeftNavigationOpen);

  const toggleButtonRef = useStore(leftNavToggleButtonRef);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const leftNavigationTopElementRef = useRef<HTMLDivElement>(null);

  const { width } = useWindowSize();

  const handleKeyDown = useCallback(
    (
      event: KeyboardEvent,
      firstFocusableElement: HTMLElement,
      lastFocusableElement: HTMLElement,
    ) => {
      if (isOpen && event.key === "Escape") {
        isLeftNavigationOpen.set(false);
      }

      trapFocus(event, firstFocusableElement, lastFocusableElement);
    },
    [isOpen],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // HACK: React LeftNav.TopLinkItem does not currently support using refs
    const lastFocusableElement = document
      .querySelector(".left-navigation")
      ?.querySelectorAll(
        `[href="${filteredpages[filteredpages.length - 1]?.url}"]`,
      )[0] as HTMLElement;

    const firstFocusableElement =
      width > 831
        ? (closeButtonRef.current as HTMLElement)
        : ((toggleButtonRef as React.RefObject<HTMLButtonElement>)
            .current as HTMLElement);

    document.addEventListener("keydown", (event) =>
      handleKeyDown(event, firstFocusableElement, lastFocusableElement),
    );

    return () => {
      document.removeEventListener("keydown", (event) =>
        handleKeyDown(event, firstFocusableElement, lastFocusableElement),
      );
    };
  }, [handleKeyDown, isOpen, filteredpages, toggleButtonRef, width]);

  return (
    <>
      <div
        className={clsx(
          "left-navigation",
          isOpen ? "left-navigation--active" : "left-navigation--hidden",
        )}
        id="left-navigation"
      >
        <LeftNavigationTopElement
          isOpen={isOpen}
          closeButtonRef={closeButtonRef}
          topElementRef={leftNavigationTopElementRef}
          toggleButtonRef={
            toggleButtonRef as React.RefObject<HTMLButtonElement>
          }
        />
        {width > 831 ? (
          <LeftNav
            aria-label="left-navigation"
            currentUrl={currentUrl}
            onNavigate={handleNavigate}
            isActiveOverride
          >
            {filteredpages.map((page, index) => (
              <LeftNav.TopLinkItem
                key={`${index}${page.title}`}
                label={page.title}
                href={page.url as string}
                className={clsx(
                  currentUrl === page.url && "neo-leftnav__main--active",
                )}
              />
            ))}
          </LeftNav>
        ) : (
          <LeftNavMobile
            currentUrl={currentUrl}
            onNavigate={handleNavigate}
            allPages={allPages}
          />
        )}
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
  closeButtonRef: React.RefObject<HTMLButtonElement>;
  topElementRef: React.RefObject<HTMLDivElement>;
  toggleButtonRef: React.RefObject<HTMLButtonElement>;
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

    if (
      closeButtonRef.current &&
      toggleButtonRef?.current &&
      isOpen !== undefined &&
      !isOpen
    ) {
      toggleButtonRef.current?.focus();
      console.log({ toggleButtonRef });
    }
  }, [closeButtonRef, isOpen, toggleButtonRef]);

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
    </div>
  );
};
