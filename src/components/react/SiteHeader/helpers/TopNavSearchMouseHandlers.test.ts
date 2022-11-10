import { vi } from "vitest";

import { closeSearchModalOnClick } from "./TopNavSearchMouseHandlers";

describe("TopNav Search Mouse Handlers", () => {
  it("returns correctly when correct parameters are passed", () => {
    const ref = { current: document.createElement("div") };

    const mouseEvent = { target: document.createElement("div") };

    const openModal: React.Dispatch<React.SetStateAction<boolean>> = vi.fn();

    closeSearchModalOnClick(
      mouseEvent as unknown as MouseEvent,
      true,
      openModal,
      ref
    );

    expect(openModal).toHaveBeenCalled();

    mouseEvent.target.classList.add("neo-modal__content");

    closeSearchModalOnClick(
      mouseEvent as unknown as MouseEvent,
      true,
      openModal,
      ref
    );

    expect(openModal).toHaveBeenCalledTimes(1);
  });
});
