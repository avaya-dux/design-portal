import { createRef, RefObject, useEffect } from "react";

import type { PageAstroInstance } from "../";

import './TopNavSearchModalResults.css'

type SearchResultsProps = {
  options: PageAstroInstance[];
};

export const SearchModalResults = (props: SearchResultsProps) => {
  const { options } = props;

  const anchorRefs: RefObject<HTMLAnchorElement>[] = options.map(() =>
    createRef<HTMLAnchorElement>()
  );

  useEffect(() => {
    console.log(anchorRefs);
  }, [options]);

  useEffect(() => {
    if (anchorRefs[0]) {
      anchorRefs[0].current?.focus();
    }
  }, [options]);

  return (
    <>
      {options.map((option, i) => (
        <a href={option.url || "/"} key={i} ref={anchorRefs[i]} tabIndex={0} className="search-result">
          {option.title}
        </a>
      ))}
    </>
  );
};
