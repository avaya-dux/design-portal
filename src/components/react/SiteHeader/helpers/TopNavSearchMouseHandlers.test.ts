import { vi } from "vitest";

import { closeSearchModalOnClick } from "./TopNavSearchMouseHandlers";

describe("TopNav Search Mouse Handlers", () => {
  const ref: any = { current: document.createElement("div") };

  const mouseEvent: any = { target: document.createElement("div") };

  let isOpen;

  const openModal: React.Dispatch<React.SetStateAction<boolean>> = vi.fn();

  describe("closeSearchModalOnClick", () => {
    it("returns correctly when correct parameters are passed", () => {
      isOpen = true;

      closeSearchModalOnClick(mouseEvent, isOpen, openModal, ref);

      expect(openModal).toHaveBeenCalled();

      mouseEvent.target.classList.add("neo-modal__content");

      closeSearchModalOnClick(mouseEvent, isOpen, openModal, ref);

      expect(openModal).toHaveBeenCalledTimes(1);
    });
  });
});
