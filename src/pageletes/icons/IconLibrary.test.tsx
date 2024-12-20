import { IconCategories, NeoIcons } from "@avaya/neo-react";
import { act, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { cleanStores, keepMount } from "nanostores";

import { IconLibrary } from "./IconLibrary";
import { categoriesToFilterFor, searchFor } from "./helpers/iconPageState";
import { findIcons } from "./helpers/iconPageUtils";
import { testIcons } from "./helpers/testIcons";

describe("IconLibrary", () => {
	it("renders without exploding", () => {
		render(<IconLibrary allCategories={IconCategories} />);

		const iconLibraryChipElement = screen.getByRole("alert");

		expect(iconLibraryChipElement).toBeInTheDocument();
	});

	it("updates number of icons displayed in chip based on filters", () => {
		keepMount(categoriesToFilterFor);

		render(<IconLibrary allCategories={IconCategories} />);

		const allIconsLength = NeoIcons.length;

		const iconLibraryChipElement = screen.getByRole("alert");

		expect(iconLibraryChipElement).toHaveTextContent(
			`${allIconsLength} icons displayed`,
		);

		act(() => {
			categoriesToFilterFor.set(["navigation"]);
		});

		const iconsInCategoryLength = NeoIcons.filter(
			(icon) => icon.category === "navigation",
		).length;

		expect(iconLibraryChipElement).toHaveTextContent(
			`${iconsInCategoryLength} icons displayed`,
		);

		cleanStores(categoriesToFilterFor);
	});

	it("updates number of icons displayed in chip based on seach by icon name", () => {
		keepMount(searchFor);

		render(<IconLibrary allCategories={IconCategories} />);

		const iconLibraryChipElement = screen.getByRole("alert");

		act(() => {
			searchFor.set("chevron");
		});

		const searchIconsLength = findIcons(NeoIcons, "chevron").length;

		expect(iconLibraryChipElement).toHaveTextContent(
			`${searchIconsLength} icons displayed`,
		);

		cleanStores(searchFor);
	});

	it("findIcons() unit tests", () => {
		const searchIconsLength = findIcons(testIcons, "conference").length;
		expect(searchIconsLength).toBe(2);

		const notFoundSearchLength = findIcons(testIcons, "sky").length;
		expect(notFoundSearchLength).toBe(0);
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(
			<IconLibrary allCategories={IconCategories} />,
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
