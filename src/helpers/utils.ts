import { elementToStaticHtml } from "@avaya/neo-react";
import toDiffableHtml from "diffable-html";

import type { ReactElement } from "react";
import type { Options } from "react-element-to-jsx-string";
import reactElementToJSXString from "react-element-to-jsx-string";
import type { PageAstroInstance, SitePages } from "./types";

export const prettyPrintReactElementToHtml = (element: ReactElement) => {
	return elementToStaticHtml(element);
};

export const prettyPrintReactElementToString = (
	element: React.ReactElement,
	options?: Options,
) => {
	return reactElementToJSXString(element, options);
};

/**
 * Prefer using `prettyPrintReactElementToHtml` instead.
 * @see prettyPrintReactElementToHtml
 */
export const prettyPrintHtml = (html: string) => {
	return toDiffableHtml(html).trim();
};

/**
 * Prefer using `prettyPrintReactElementToString` instead.
 * @deprecated
 * @see prettyPrintReactElementToString
 */
export const prettyPrintReact = (react: string) => {
	return react.trim();
};

export const getPagesInOrder = (pages: Array<PageAstroInstance> = []) => {
	const result: SitePages = {
		accessibility: [],
		components: [],
		docs: [],
		guidelines: [],
	};

	const accessibilityPages = pages.filter((page) =>
		page.url?.includes("accessibility"),
	);
	result.accessibility = sortPages(accessibilityPages);

	const componentPages = pages.filter((page) =>
		page.url?.includes("components"),
	);
	result.components = sortPages(componentPages);

	const docsPages = pages.filter((page) => page.url?.includes("docs"));
	result.docs = sortPages(docsPages);

	const guidelinesPages = pages.filter((page) =>
		page.url?.includes("guidelines"),
	);
	result.guidelines = sortPages(guidelinesPages);

	return result;
};
const sortPages = (pages: Array<PageAstroInstance>) => {
	if (pages.length === 0 || pages.filter((page) => page.order).length === 0)
		return pages;

	return [...pages].sort((a, b) => {
		if (a.order && b.order) {
			return a.order - b.order;
		}
		if (a.order) {
			return -1;
		}
		if (b.order) {
			return 1;
		}
		return 0;
	});
};
