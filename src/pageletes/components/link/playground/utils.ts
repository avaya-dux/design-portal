import clsx from "clsx";

import { prettyPrintHtml, prettyPrintReact } from "helpers";

export const reactCode = (typeOption: string, disabled: boolean) =>
	prettyPrintReact(createReactCode(typeOption, disabled));

export const htmlCode = (typeOption: string, disabled: boolean) =>
	prettyPrintHtml(createHtmlCode(typeOption, disabled));

export const createHtmlCode = (typeOption: string, disabled: boolean) => {
	return clsx(
		"<a",
		`class="${createHtmlClasses(typeOption, disabled)}"`,
		'href="#main">Link</a>',
	);
};

const createHtmlClasses = (typeOption: string, disabled: boolean) => {
	return clsx(
		"neo-link",
		disabled && "neo-link__disabled",
		typeOption === "inline" && "neo-link__inline",
	);
};
export const createReactCode = (typeOption: string, disabled: boolean) => {
	return `<Link ${createReactAttributes(typeOption, disabled)}>Link</Link>`;
};

const createReactAttributes = (typeOption: string, disabled: boolean) => {
	const attributes = ['href="#main"'];
	if (disabled) {
		attributes.push("disabled");
	}
	if (typeOption === "inline") {
		attributes.push("inline");
	}
	return attributes.join(" ");
};
