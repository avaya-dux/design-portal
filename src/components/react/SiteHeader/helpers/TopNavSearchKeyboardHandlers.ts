export type ModalShortcutKeysType = {
  Meta?: boolean;
  Control?: boolean;
  k?: boolean;
};

export const topNavSearchOnKeyDown = (
  event: KeyboardEvent,
  setKeysPressed: React.Dispatch<React.SetStateAction<ModalShortcutKeysType>>
) => {
  setKeysPressed((keysPressed) => ({
    ...keysPressed,
    Meta: event.key === "Meta",
    Control: event.key === "Control",
    k: event.key === "k",
  }));
};

export const topNavSearchOnKeyUp = (
  event: KeyboardEvent,
  setShortcutKeys: React.Dispatch<React.SetStateAction<ModalShortcutKeysType>>
) => {
  if (event.key === "Meta") {
    setShortcutKeys((shortcutKeys) => ({ ...shortcutKeys, Meta: false }));
  }

  if (event.key === "k") {
    setShortcutKeys((shortcutKeys) => ({ ...shortcutKeys, k: false }));
  }

  if (event.key === "Control") {
    setShortcutKeys((shortcutKeys) => ({ ...shortcutKeys, Control: false }));
  }
};

export const openSearchModal = (
  os?: string,
  shortcutKeys: ModalShortcutKeysType,
  openModal: React.Dispatch<React.SetStateAction<boolean>>,
  setShortcutKeys: React.Dispatch<React.SetStateAction<ModalShortcutKeysType>>
) => {
  if (OS === "macOS" && shortcutKeys.Meta && shortcutKeys.k) {
    openModal(true);
    setShortcutKeys((shortcutKeys) => ({
      ...shortcutKeys,
      Meta: false,
      k: false,
    }));
  } else if (OS === "windows" && shortcutKeys.Control && shortcutKeys.k) {
    openModal(true);
    setShortcutKeys((shortcutKeys) => ({
      ...shortcutKeys,
      control: false,
      k: false,
    }));
  }
};

export const closeSearchModalOnEscapeKeyPress = (
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

    if (indexToFocus === undefined || indexToFocus + 1 < searchResultsLength) {
      setIndexToFocus(0);
     } else {
      setIndexToFocus(() => indexToFocus + 1);
    }
  } else if (event.key === "ArrowUp") {
    event.preventDefault();

    if (indexToFocus !== undefined && indexToFocus - 1 < 0) {
      setIndexToFocus(searchResultsLength - 1);
    } else {
      setIndexToFocus(() => indexToFocus - 1);
    }
  }
};
