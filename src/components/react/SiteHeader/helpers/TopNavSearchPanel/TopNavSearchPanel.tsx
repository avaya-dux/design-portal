import { InfoModal } from "@avaya/neo-react";
import { useEffect } from "react";

import type { PageAstroInstance } from "helpers/types";

import { TopNavSearchResults } from "./TopNavSearchResults";

import {
	breakpoints,
	disableScrollOnMobile,
	useWindowSize,
} from "components/react/utils";

import "./TopNavSearchPanel.css";

type TopNavSearchPanelProps = {
	open: boolean;
	options: PageAstroInstance[];
	children: React.ReactElement;
	searchModalRef?: React.RefObject<HTMLDivElement>;
};

export const TopNavSearchPanel = ({
	open,
	options,
	children,
	searchModalRef,
}: TopNavSearchPanelProps) => {
	const size = useWindowSize();

	useEffect(() => {
		const handleScrollAtMobile = () => {
			disableScrollOnMobile(open, size.width, breakpoints.mobileMax);
		};

		window.addEventListener("scroll", handleScrollAtMobile);

		return () => {
			window.removeEventListener("scroll", handleScrollAtMobile);
		};
	}, [open, size]);

	const searchInputAndResults = (
		<div
			className="link-container"
			ref={size.width > breakpoints.mobileMax ? searchModalRef : null}
		>
			{children}
			<div className="search-panel__results">
				<TopNavSearchResults options={options} />
			</div>
			<div className="search-panel__keyboard-nav">
				<div>
					<span
						className="search-panel__image"
						role="img"
						aria-label="Enter key"
					>
						Enter
					</span>{" "}
					to select
				</div>
				<div>
					<span className="search-panel__image" role="img" aria-label="Up key">
						↑
					</span>
					<span
						className="search-panel__image"
						role="img"
						aria-label="Down key"
					>
						↓
					</span>{" "}
					to navigate
				</div>
			</div>
		</div>
	);

	return (
		<InfoModal
			open={open}
			// HACK: Design of Search Modal does not have a close button, but this prop is required in our Modal Component.
			// Removing close button using CSS instead & will address in React library
			onClose={() => null}
			title=""
			// Our React Modal renders outside the top-level div element so it needed its own 'neo-dynamic' class name to respond to theming
			className="search-panel neo-dynamic"
		>
			{searchInputAndResults}
		</InfoModal>
	);
};
