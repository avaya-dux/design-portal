import { createRef, RefObject, useEffect, useState } from "react";

import type { PageAstroInstance } from "../..";

import "./TopNavSearchModalResults.css";

import { searchModalResultsArrowNavigation } from "../TopNavSearchKeyboardHandlers";

type TopNavSearchModalResultsProps = {
  options: PageAstroInstance[];
};

export const TopNavSearchModalResults = ({
  options,
}: TopNavSearchModalResultsProps) => {
  const [indexToFocus, setIndexToFocus] = useState<number | undefined>();

  const anchorRefs: RefObject<HTMLAnchorElement>[] = options.map(() =>
    createRef<HTMLAnchorElement>()
  );

  useEffect(() => {
    if (indexToFocus !== undefined && anchorRefs[indexToFocus]) {
      anchorRefs[indexToFocus]!.current?.focus();
    }
  }, [indexToFocus]);

  const handleArrowNavigation = (event: KeyboardEvent) => {
    searchModalResultsArrowNavigation(
      event,
      options.length,
      indexToFocus,
      setIndexToFocus
    );
  };

  useEffect(() => {
    window.addEventListener("keydown", handleArrowNavigation);

    return () => {
      window.removeEventListener("keydown", handleArrowNavigation);
    };
  }, [options, indexToFocus]);

  useEffect(() => {
    if (!options.length) {
      setIndexToFocus(undefined);
    }
  }, [options]);

  return (
    <>
      {options.map((option, i) => (
        <a
          href={option.url || "/"}
          key={i}
          ref={anchorRefs[i]}
          tabIndex={0}
          className="search-result"
          // HACK: The below code reconciles navigation with Tab & Arrow Keys
          // May not be needed pending feedback from Matt
          onFocus={(event) => {
            if (
              indexToFocus != undefined &&
              anchorRefs[indexToFocus] &&
              event.target != anchorRefs[indexToFocus]!.current
            )
              setIndexToFocus(i);
          }}
        >
          {option.title}
        </a>
      ))}
    </>
  );
};
