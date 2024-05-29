import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { ExampleComponent } from "./";

describe("ExampleComponent", () => {
	window.alert = () => null;
	const user = userEvent.setup();

	it("fully renders without exploding", () => {
		render(<ExampleComponent>Test</ExampleComponent>);

		const rootElement = screen.getByRole("button");
		expect(rootElement).toBeDefined();
	});

	it("accepts an `onclick` event which fires appropriately", async () => {
		const clickSpy = vi.fn();
		render(<ExampleComponent onClick={clickSpy}>Test</ExampleComponent>);
		expect(clickSpy).not.toHaveBeenCalled();

		await user.click(screen.getByRole("button"));
		expect(clickSpy).toHaveBeenCalledTimes(1);
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(<ExampleComponent>Test</ExampleComponent>);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
