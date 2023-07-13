import { vi } from "vitest";

import {
  closeSearchModal,
  openSearchModal,
  searchResultsArrowNavigation,
  topNavSearchOnKeyDown,
  topNavSearchOnKeyUp,
} from "./TopNavSearchKeyboardHandlers";

import type { ModalShortcutKeysType } from "./TopNavSearchKeyboardHandlers";

describe("TopNav Search Keyboard Handlers", () => {
  const setKeysPressed: React.Dispatch<
    React.SetStateAction<ModalShortcutKeysType>
  > = vi.fn();

  const keypressEvents = [{ key: "Meta" }, { key: "Control" }, { key: "k" }];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("topNavSearchOnKeyDown", () => {
    it("detects the correct keys and calls the passed-in function as necessary", () => {
      keypressEvents.forEach((keyEvent) => {
        topNavSearchOnKeyDown(keyEvent as KeyboardEvent, setKeysPressed);
        expect(setKeysPressed).toHaveBeenCalled();
      });
    });

    it("does not call the passed-in function when the wrong key is pressed", () => {
      const keyPressEvent = { key: "Enter" };

      topNavSearchOnKeyDown(keyPressEvent as KeyboardEvent, setKeysPressed);
      expect(setKeysPressed).not.toHaveBeenCalled();
    });
  });

  describe("topNavSearchOnKeyDown", () => {
    it("detects the correct keys and calls the passed-in function as necessary", () => {
      keypressEvents.forEach((keyEvent) => {
        topNavSearchOnKeyUp(keyEvent as KeyboardEvent, setKeysPressed);
        expect(setKeysPressed).toHaveBeenCalled();
      });
    });

    it("does not call the passed-in function when the wrong key is pressed", () => {
      const keyPressEvent = { key: "Enter" };

      topNavSearchOnKeyUp(keyPressEvent as KeyboardEvent, setKeysPressed);
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

      const keyPressEvent = { key: "Escape" };

      closeSearchModal(keyPressEvent as KeyboardEvent, false, openModal);

      expect(openModal).not.toHaveBeenCalled();

      closeSearchModal(keyPressEvent as KeyboardEvent, true, openModal);

      expect(openModal).toHaveBeenCalledWith(false);
    });
  });
});

describe("Search Modal Results Keyboard Navigation", () => {
  const downArrowKeypress = { key: "ArrowDown", preventDefault: vi.fn() };

  const upArrowKeypress = { key: "ArrowUp", preventDefault: vi.fn() };

  const searchResultsLength = 10;

  const setIndexToFocus: React.Dispatch<
    React.SetStateAction<number | undefined>
  > = vi.fn();

  describe("behaviour on arrow key down", () => {
    it("returns correctly when indexToFocus is undefined", () => {
      searchResultsArrowNavigation(
        downArrowKeypress as unknown as KeyboardEvent,
        searchResultsLength,
        undefined,
        setIndexToFocus,
      );

      expect(downArrowKeypress.preventDefault).toHaveBeenCalled();
      expect(setIndexToFocus).toHaveBeenNthCalledWith(1, 0);
    });

    it("returns correctly when indexToFocus is greater than searchResultsLength", () => {
      searchResultsArrowNavigation(
        downArrowKeypress as unknown as KeyboardEvent,
        searchResultsLength,
        11,
        setIndexToFocus,
      );

      expect(downArrowKeypress.preventDefault).toHaveBeenCalled();
      expect(setIndexToFocus).toHaveBeenNthCalledWith(2, 0);
    });

    it("increments indexToFocus correctly when value is neither undefined nor equal to the index of the final element", () => {
      searchResultsArrowNavigation(
        downArrowKeypress as unknown as KeyboardEvent,
        searchResultsLength,
        8,
        setIndexToFocus,
      );

      expect(downArrowKeypress.preventDefault).toHaveBeenCalled();
      expect(setIndexToFocus).toHaveBeenNthCalledWith(3, 9);
    });
  });

  describe("behaviour on arrow key up", () => {
    it("sets indexToFocus correctly when value passed in is 0", () => {
      searchResultsArrowNavigation(
        upArrowKeypress as unknown as KeyboardEvent,
        searchResultsLength,
        0,
        setIndexToFocus,
      );

      expect(downArrowKeypress.preventDefault).toHaveBeenCalled();
      expect(setIndexToFocus).toHaveBeenNthCalledWith(
        4,
        searchResultsLength - 1,
      );
    });

    it("sets indexToFocus correctly when value passed in is greater than 0", () => {
      searchResultsArrowNavigation(
        upArrowKeypress as unknown as KeyboardEvent,
        searchResultsLength,
        1,
        setIndexToFocus,
      );

      expect(downArrowKeypress.preventDefault).toHaveBeenCalled();
      expect(setIndexToFocus).toHaveBeenNthCalledWith(5, 0);
    });
  });
});
