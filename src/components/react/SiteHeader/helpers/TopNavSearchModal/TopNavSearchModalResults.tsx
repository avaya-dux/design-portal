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
  const [indexToFocus, setIndexToFocus] = useState<number>(0);

  const anchorRefs: RefObject<HTMLAnchorElement>[] = options.map(() =>
    createRef<HTMLAnchorElement>()
  );

  useEffect(() => {
    if (anchorRefs[0]) {
      anchorRefs[0]!.current?.focus();
    }
  }, [options]);

  useEffect(() => {
    if (anchorRefs[indexToFocus]) {
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

  return (
    <>
      {options.map((option, i) => (
        <a
          href={option.url || "/"}
          key={i}
          ref={anchorRefs[i]}
          tabIndex={0}
          className="search-result"
        >
          {option.title}
        </a>
      ))}
    </>
  );
};
