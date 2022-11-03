export type ModalShortcutKeysType = {
  Meta?: boolean;
  Control?: boolean;
  k?: boolean;
};

export const TopNavSearchOnKeyDown = (
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

export const TopNavSearchOnKeyUp = (
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

export const openModal = (
  OS: string | undefined,
  shortcutKeys: ModalShortcutKeysType,
  openModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (OS === "macOS") {
    if (shortcutKeys.Meta === true && shortcutKeys.k === true) {
      openModal(true);
    }
  } else if (OS === "windows") {
    if (shortcutKeys.Control && shortcutKeys.k) {
      openModal(true);
    }
  }
};

export const closeModal = (
  event: KeyboardEvent,
  isOpen: boolean,
  openModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (isOpen && event.key == "Escape") {
    openModal(false);
  }
};
