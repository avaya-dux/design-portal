import { createRef, RefObject, useEffect, useState } from "react";

import type { PageAstroInstance } from "../";

import "./TopNavSearchModalResults.css";

type SearchResultsProps = {
  options: PageAstroInstance[];
  indexToFocus: number;
};

export const SearchModalResults = (props: SearchResultsProps) => {
  const { options, indexToFocus } = props;

  const anchorRefs: RefObject<HTMLAnchorElement>[] = options.map(() =>
    createRef<HTMLAnchorElement>()
  );

  useEffect(() => {
    if (anchorRefs[indexToFocus]) {
      anchorRefs[indexToFocus]!.current?.focus();
    }
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
