import { InfoModal, TextInput } from "@avaya/neo-react";

export const SearchModal: ReactElement = ({children}) => {
  return (
    <InfoModal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title=""
      className="search-modal"
    >
      <div className="link-container" ref={searchModalRef}>
        <TextInput
          aria-label="Search site"
          onChange={(e) => setSearch(e.currentTarget.value)}
          value={search}
          clearable={false}
          endAddon={
            <button
              onClick={() => setIsOpen(false)}
              className="search-modal__button"
            >
              esc
            </button>
          }
          autoFocus
        />
        <div className="search-modal__results">{children}</div>
        <div className="search-modal__keyboard-nav">
          <div>
            <button className="search-modal__button">Enter</button> to select
          </div>
          <div>
            <button className="search-modal__button">↑</button>
            <button className="search-modal__button">↓</button> to navigate
          </div>
        </div>
      </div>
    </InfoModal>
  );
};
