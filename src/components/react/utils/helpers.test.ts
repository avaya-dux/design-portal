import { vi } from "vitest";

import { breakpoints } from "components/react/utils/constants";
import { disableScrollOnMobile, trapFocus } from "./helpers";

describe("disableScroll", () => {
	const spyScroll = vi.fn();
	Object.defineProperty(window, "scroll", { value: spyScroll });

	it("fires the correct event when the appropiate values are passed in", () => {
		disableScrollOnMobile(true, 320, breakpoints.mobileMax);

		expect(window.scroll).toHaveBeenCalled();
	});

	it("does not fire when the appropiate values are passed in", () => {
		disableScrollOnMobile(false, 320, breakpoints.mobileMax);

		expect(window.scroll).not.toHaveBeenCalledTimes(2);
	});
});

describe("trapFocus", () => {
	const firstFocusableItem = { focus: vi.fn() };
	const lastFocusableItem = { focus: vi.fn() };

	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("focuses correctly when tabbing from last focusable item", () => {
		Object.defineProperty(global.document, "activeElement", {
			value: lastFocusableItem,
			configurable: true,
		});

		trapFocus(
			{ key: "Tab", preventDefault: vi.fn() } as unknown as KeyboardEvent,
			firstFocusableItem as unknown as HTMLElement,
			lastFocusableItem as unknown as HTMLElement,
		);

		expect(firstFocusableItem.focus).toHaveBeenCalled();
	});

	it("focuses correctly when tabbing up from first focusable item", () => {
		Object.defineProperty(global.document, "activeElement", {
			value: firstFocusableItem,
		});

		trapFocus(
			{
				key: "Tab",
				shiftKey: true,
				preventDefault: vi.fn(),
			} as unknown as KeyboardEvent,
			firstFocusableItem as unknown as HTMLElement,
			lastFocusableItem as unknown as HTMLElement,
		);

		expect(lastFocusableItem.focus).toHaveBeenCalled();
	});

	it("does nothing if key pressed is not Tab", () => {
		trapFocus(
			{ key: "Enter" } as KeyboardEvent,
			firstFocusableItem as unknown as HTMLElement,
			lastFocusableItem as unknown as HTMLElement,
		);

		expect(firstFocusableItem.focus).not.toHaveBeenCalled();
		expect(lastFocusableItem.focus).not.toHaveBeenCalled();
	});
});
