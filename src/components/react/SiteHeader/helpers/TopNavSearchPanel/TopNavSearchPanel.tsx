import { InfoModal } from "@avaya/neo-react";

import type { ReactElement } from "react";
import type { PageAstroInstance } from "components/index";

import { TopNavSearchResults } from "./TopNavSearchResults";

import { useWindowSize, breakpoints } from "components/react/utils";

import "./TopNavSearchPanel.css";

type TopNavSearchPanelProps = {
  open: boolean;
  options: PageAstroInstance[];
  children: ReactElement;
  searchModalRef?: React.RefObject<HTMLDivElement>;
};

export const TopNavSearchPanel = ({
  open,
  options,
  children,
  searchModalRef,
}: TopNavSearchPanelProps) => {
  const size = useWindowSize();

  const searchInputAndResults = (
    <div
      className="link-container"
      ref={size.width > breakpoints.mobileMax ? searchModalRef : null}
    >
      {children}
      <div className="search-panel__results">
        <TopNavSearchResults options={options} />
      </div>
      {size.width > breakpoints.mobileMax && (
        <div className="search-panel__keyboard-nav">
          <div>
            <span className="search-panel__button">Enter</span> to select
          </div>
          <div>
            <span className="search-panel__button">↑</span>
            <span className="search-panel__button">↓</span> to navigate
          </div>
        </div>
      )}
    </div>
  );

  return size.width > breakpoints.mobileMax ? (
    <InfoModal
      open={open}
      // HACK: Design of Search Modal does not have a close button, but this prop is required in our Modal Component.
      // Removing close button using CSS instead & will address in React library
      onClose={() => null}
      title=""
      // Our React Modal renders outside the top-level div element so it needed its own 'neo-dynamic' class name to respond to theming
      className="search-panel neo-dynamic"
    >
      {searchInputAndResults}
    </InfoModal>
  ) : (
    <>
      {open && (
        <div className="search-panel--mobile">{searchInputAndResults}</div>
      )}
    </>
  );
};
