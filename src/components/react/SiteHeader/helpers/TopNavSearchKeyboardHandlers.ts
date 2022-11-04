import type { PageAstroInstance } from "../";

export type ModalShortcutKeysType = {
  Meta?: boolean;
  Control?: boolean;
  k?: boolean;
};

export const topNavSearchOnKeyDown = (
  event: KeyboardEvent,
  setShortcutKeys: React.Dispatch<React.SetStateAction<ModalShortcutKeysType>>
) => {
  if (event.key === "Meta") {
    setShortcutKeys((shortcutKeys) => ({ ...shortcutKeys, Meta: true }));
  }

  if (event.key === "k") {
    setShortcutKeys((shortcutKeys) => ({ ...shortcutKeys, k: true }));
  }

  if (event.key === "Control") {
    setShortcutKeys((shortcutKeys) => ({ ...shortcutKeys, Control: true }));
  }
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
  OS: string | undefined,
  shortcutKeys: ModalShortcutKeysType,
  openModal: React.Dispatch<React.SetStateAction<boolean>>,
  setShortcutKeys: React.Dispatch<React.SetStateAction<ModalShortcutKeysType>>
) => {
  if (OS === "macOS") {
    if (shortcutKeys.Meta === true && shortcutKeys.k === true) {
      openModal(true);
      setShortcutKeys(shortcutKeys => ({...shortcutKeys, Meta: false, k: false}))

    }
  } else if (OS === "windows") {
    if (shortcutKeys.Control && shortcutKeys.k) {
      openModal(true);
      setShortcutKeys(shortcutKeys => ({...shortcutKeys, Meta: false, control: false}))
    }
  }
};

export const closeSearchModal = (
  event: KeyboardEvent,
  isOpen: boolean,
  openModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (isOpen && event.key == "Escape") {
    openModal(false);
  }
};

export const searchModalResultsArrowNavigation = (event: KeyboardEvent, searchResultsLength: number, indexToFocus: number, setIndexToFocus: React.Dispatch<React.SetStateAction<number>>) => {

console.log(searchResultsLength)
console.log(indexToFocus)

  if (event.key === "ArrowDown") {
    event.preventDefault();

    if (indexToFocus + 2 > searchResultsLength) {
      setIndexToFocus(0);
    } else {
      setIndexToFocus((indexToFocus) => indexToFocus + 1);
    }
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();

    if (indexToFocus - 1 < 0) {
      setIndexToFocus(searchResultsLength - 1);
    } else {
      setIndexToFocus((indexToFocus) => indexToFocus - 1);
    }
  }
};
