export type ModalShortcutKeysType = {
  Meta?: boolean;
  Control?: boolean;
  k?: boolean;
};

export const topNavSearchOnKeyDown = (
  event: KeyboardEvent,
  setKeysPressed: React.Dispatch<React.SetStateAction<ModalShortcutKeysType>>
) => {
  if (event.key === "Meta") {
    setKeysPressed((shortcutKeys) => ({ ...shortcutKeys, Meta: true }));
  }

  if (event.key === "k") {
    setKeysPressed((shortcutKeys) => ({ ...shortcutKeys, k: true }));
  }

  if (event.key === "Control") {
    setKeysPressed((shortcutKeys) => ({ ...shortcutKeys, Control: true }));
  }
};

export const topNavSearchOnKeyUp = (
  event: KeyboardEvent,
  setKeysPressed: React.Dispatch<React.SetStateAction<ModalShortcutKeysType>>
) => {
  if (event.key === "Meta") {
    setKeysPressed((shortcutKeys) => ({ ...shortcutKeys, Meta: false }));
  }

  if (event.key === "k") {
    setKeysPressed((shortcutKeys) => ({ ...shortcutKeys, k: false }));
  }

  if (event.key === "Control") {
    setKeysPressed((shortcutKeys) => ({ ...shortcutKeys, Control: false }));
  }
};

export const openSearchModal = (
  shortcutKeys: ModalShortcutKeysType,
  openModal: React.Dispatch<React.SetStateAction<boolean>>,
  setKeysPressed: React.Dispatch<React.SetStateAction<ModalShortcutKeysType>>
) => {
  if (shortcutKeys.k && (shortcutKeys.Control || shortcutKeys.Meta)) {
    openModal(true);
    setKeysPressed({
      Meta: false,
      Control: false,
      k: false,
    });
  }
};

export const closeSearchModal = (
  event: KeyboardEvent,
  isOpen: boolean,
  openModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (isOpen && event.key === "Escape") {
    openModal(false);
  }
};

export const searchModalResultsArrowNavigation = (
  event: KeyboardEvent,
  searchResultsLength: number,
  indexToFocus: number | undefined,
  setIndexToFocus: React.Dispatch<React.SetStateAction<number | undefined>>
) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();

    if (indexToFocus === undefined || indexToFocus + 2 > searchResultsLength) {
      setIndexToFocus(0);
    } else {
      setIndexToFocus((indexToFocus) => indexToFocus + 1);
    }
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();

    if (indexToFocus !== undefined && indexToFocus - 1 < 0) {
      setIndexToFocus(searchResultsLength - 1);
    } else {
      setIndexToFocus(() => indexToFocus - 1);
    }
  }
};
