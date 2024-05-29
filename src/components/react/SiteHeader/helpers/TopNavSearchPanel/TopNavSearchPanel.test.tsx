import { TextInput } from "@avaya/neo-react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { axe } from "jest-axe";

import { filteredPagesMockData } from "components/react/utils/shared-mocks";

import { TopNavSearchPanel } from "./TopNavSearchPanel";

describe("TopNavSearchPanel", () => {
	it("renders without exploding", () => {
		render(
			<TopNavSearchPanel open options={filteredPagesMockData}>
				<TextInput aria-label="test text input" />
			</TopNavSearchPanel>,
		);

		const rootElement = screen.getByRole("dialog");
		expect(rootElement).toBeInTheDocument();
	});

	it("renders correctly when window resizes to mobile screen sizes", () => {
		Object.defineProperty(window, "innerWidth", {
			get: () => 800,
			configurable: true,
		});

		render(
			<TopNavSearchPanel open options={filteredPagesMockData}>
				<TextInput aria-label="test text input" />
			</TopNavSearchPanel>,
		);

		const keyboardNavInstructions = screen.getAllByRole("img");

		keyboardNavInstructions.forEach(async (element) => {
			await waitFor(() => expect(element).toBeVisible());
		});

		act(() => {
			window.innerWidth = 300;
		});

		const keyBoardNavInstructionsAtMobile = screen.getAllByRole("img");

		keyBoardNavInstructionsAtMobile.forEach(async (element) => {
			await waitFor(() => expect(element).not.toBeVisible());
		});
	});

	it("passes basic accessibility compliance", async () => {
		const { container } = render(
			<TopNavSearchPanel open options={filteredPagesMockData}>
				<TextInput aria-label="test text input" />
			</TopNavSearchPanel>,
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
