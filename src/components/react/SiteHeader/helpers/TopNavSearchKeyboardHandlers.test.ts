import { vi } from "vitest";

import { closeSearchModal, openSearchModal, searchModalResultsArrowNavigation, topNavSearchOnKeyDown, topNavSearchOnKeyUp } from "./TopNavSearchKeyboardHandlers";

import type { ModalShortcutKeysType } from "./TopNavSearchKeyboardHandlers";
import type { KeyboardEvent } from "react";

describe("TopNav Search Keyboard Handlers", () => {
  let setKeysPressed: React.Dispatch<
    React.SetStateAction<ModalShortcutKeysType>
  >;

  const keypressEvents: any[] = [
    { key: "Meta" },
    { key: "Control" },
    { key: "k" },
  ];

  beforeEach(() => {
    setKeysPressed = vi.fn();
  });

  describe("topNavSearchOnKeyDown", () => {
    it("detects the correct keys and calls the passed-in function as necessary", () => {
      keypressEvents.forEach((keyEvent) => {
        topNavSearchOnKeyDown(keyEvent, setKeysPressed);
        expect(setKeysPressed).toHaveBeenCalled();
      });
    });

    it("does not call the passed-in function when the wrong key is pressed", () => {
      const keyPressEvent: any = { key: "Enter" };

      topNavSearchOnKeyDown(keyPressEvent, setKeysPressed);
      expect(setKeysPressed).not.toHaveBeenCalled();
    });
  });

  describe("topNavSearchOnKeyDown", () => {
    it("detects the correct keys and calls the passed-in function as necessary", () => {
      keypressEvents.forEach((keyEvent) => {
        topNavSearchOnKeyUp(keyEvent, setKeysPressed);
        expect(setKeysPressed).toHaveBeenCalled();
      });
    });

    it("does not call the passed-in function when the wrong key is pressed", () => {
      const keyPressEvent: any = { key: "Enter" };

      topNavSearchOnKeyUp(keyPressEvent, setKeysPressed);
      expect(setKeysPressed).not.toHaveBeenCalled();
    });
  });

  describe("openSearchModal", () => {
    it("calls passed-in function with true when correct values are used", () => {
      const openModal: React.Dispatch<React.SetStateAction<boolean>> = vi.fn();

      const shortcutKeys = {
        Meta: false,
        Control: true,
        k: false,
      };

      openSearchModal(shortcutKeys, openModal, setKeysPressed);
      expect(openModal).not.toHaveBeenCalled();
      expect(setKeysPressed).not.toHaveBeenCalled();

      shortcutKeys.k = true;

      openSearchModal(shortcutKeys, openModal, setKeysPressed);
      expect(openModal).toHaveBeenCalledWith(true);
      expect(setKeysPressed).toHaveBeenCalledWith({
        Meta: false,
        Control: false,
        k: false,
      });
    });
  });
  describe("closeSearchModal", () => {
    it("calls passed-in function with false when correct values are used", () => {
      const openModal: React.Dispatch<React.SetStateAction<boolean>> = vi.fn();

      let isOpen = false;

      const keyPressEvent: any = { key: "Escape" };

      closeSearchModal(keyPressEvent, isOpen, openModal);

      expect(openModal).not.toHaveBeenCalled();

      isOpen = true;

      closeSearchModal(keyPressEvent, isOpen, openModal);

      expect(openModal).toHaveBeenCalledWith(false);
    });
  });
});

describe("Search Modal Results Keyboard Navigation", () => {
  const downArrowKeypress: any = { key: "ArrowDown", preventDefault: vi.fn() };

  let searchResultsLength: number;

  let indexToFocus: number | undefined;

  const setIndexToFocus: React.Dispatch<
    React.SetStateAction<number | undefined>
  > = vi.fn();

  beforeEach(() => {
    searchResultsLength = Math.random();
  });

  describe("behaviour on arrow key down", () => {
    it("returns correctly when indexToFocus is undefined", () => {
      searchModalResultsArrowNavigation(
        downArrowKeypress,
        searchResultsLength,
        indexToFocus,
        setIndexToFocus
      );

      expect(downArrowKeypress.preventDefault).toHaveBeenCalled();
      expect(setIndexToFocus).toHaveBeenCalledWith(0);
    });
  });
  it("returns correctly when indexToFocus is undefined", () => {
    searchModalResultsArrowNavigation(
      downArrowKeypress,
      searchResultsLength,
      indexToFocus,
      setIndexToFocus
    );

    expect(downArrowKeypress.preventDefault).toHaveBeenCalled();
    expect(setIndexToFocus).toHaveBeenCalledWith(0);
  });
});

