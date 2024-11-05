import { Pagination } from "@avaya/neo-react";
import "./pagination-playground.css";
import { useState } from "react";

import { Playground } from "components/react";

import {
	prettyPrintReactElementToHtml,
	prettyPrintReactElementToString,
} from "helpers";

const storybook =
	"https://neo-react-library-storybook.netlify.app/?path=/docs/components-pagination--docs";

const sandbox = "https://codesandbox.io/p/sandbox/neo-react-pagination-mcxh2f";

export const PlaygroundImplementation = () => {
	const [setIndex, setPageIndex] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(20);
	const itemCount = 100;

	const element = (
		<Pagination
			currentPageIndex={setIndex}
			alwaysShowPagination={true}
			itemCount={itemCount}
			itemsPerPage={itemsPerPage}
			itemsPerPageOptions={[20, 50, 100]}
			itemDisplayType={"count"}
			onPageChange={(_, newIndex) => {
				setPageIndex(newIndex);
			}}
			onItemsPerPageChange={(newItemsPerPage) => {
				setItemsPerPage(newItemsPerPage);

				const maxPageIndex = Math.ceil(itemCount / newItemsPerPage);
				if (setIndex > maxPageIndex) {
					setPageIndex(maxPageIndex);
				}
			}}
		/>
	);

	return (
		<Playground
			examples={{
				html: prettyPrintReactElementToHtml(element),
				react: prettyPrintReactElementToString(element),
				sandbox,
				storybook,
			}}
		>
			{element}
		</Playground>
	);
};
