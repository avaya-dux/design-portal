import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { cleanStores, keepMount } from "nanostores";
import { vi } from "vitest";

import { isLeftNavigationOpen } from "components/react/utils/layoutState";

import { SiteHeader } from ".";
import { allPagesMockData } from "../utils/shared-mocks";

describe("SiteHeader", () => {
	beforeEach(() => {
		// for the `Logo` component, need to mock `window.matchMedia`
		vi.stubGlobal(
			"matchMedia",
			vi.fn(() => ({
				matches: false,
			})),
		);

		return () => {
			vi.resetAllMocks();
		};
	});

	it("fully renders without exploding", () => {
		render(<SiteHeader pathname="/" pages={allPagesMockData} userAgent="" />);

		const rootElement = screen.getByRole("navigation");
		expect(rootElement).toBeInTheDocument();
	});

	it("updates whether Left Navigation is open correctly in layout state", async () => {
		const user = userEvent.setup();
		keepMount(isLeftNavigationOpen);

		render(
			<SiteHeader
				pathname="/"
				pages={allPagesMockData}
				userAgent=""
				showToggleBtn
			/>,
		);

		expect(isLeftNavigationOpen.get()).toEqual(undefined);

		const toggleButton = screen.getAllByRole("button")[0];

		await user.click(toggleButton as Element);

		expect(isLeftNavigationOpen.get()).toEqual(true);

		await user.click(toggleButton as Element);

		expect(isLeftNavigationOpen.get()).toEqual(false);

		cleanStores(isLeftNavigationOpen);
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(
			<SiteHeader pathname="/" pages={allPagesMockData} userAgent="" />,
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
