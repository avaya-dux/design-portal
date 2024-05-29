import { Button, TextInput } from "@avaya/neo-react";
import { useEffect, useRef, useState } from "react";

import type { PageAstroInstance } from "helpers/types";

import type { ModalShortcutKeysType } from "./TopNavSearchKeyboardHandlers";
import {
	closeSearchModal,
	openSearchModal,
	topNavSearchOnKeyDown,
	topNavSearchOnKeyUp,
} from "./TopNavSearchKeyboardHandlers";
import { closeSearchModalOnClick } from "./TopNavSearchMouseHandlers";
import { TopNavSearchPanel } from "./TopNavSearchPanel";

import "./TopNavSearch.css";

export const TopNavSearch = ({
	pages,
	userAgent,
}: {
	pages: PageAstroInstance[];
	userAgent: string;
}) => {
	const [search, setSearch] = useState("");
	const [options, setOptions] = useState<PageAstroInstance[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [shortcutKeysPressed, setShortcutKeysPressed] =
		useState<ModalShortcutKeysType>({
			Meta: false,
			Control: false,
			k: false,
		});

	const searchModalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (search) {
			const lowerCaseSearch = search.toLowerCase();

			const filteredPages = pages.filter(
				(page) =>
					page.title.toLowerCase().includes(lowerCaseSearch) ||
					page.keywords.toLowerCase().includes(lowerCaseSearch),
			);

			setOptions(filteredPages.length ? filteredPages : []);
		} else {
			setOptions([]);
		}
	}, [pages, search]);

	useEffect(() => {
		window.addEventListener("keydown", (event) =>
			topNavSearchOnKeyDown(event, setShortcutKeysPressed),
		);
		window.addEventListener("keyup", (event) =>
			topNavSearchOnKeyUp(event, setShortcutKeysPressed),
		);

		return () => {
			window.removeEventListener("keydown", (event) =>
				topNavSearchOnKeyDown(event, setShortcutKeysPressed),
			);
			window.removeEventListener("keyup", (event) =>
				topNavSearchOnKeyUp(event, setShortcutKeysPressed),
			);
		};
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		openSearchModal(shortcutKeysPressed, setIsOpen, setShortcutKeysPressed);
	}, [userAgent, shortcutKeysPressed]);

	useEffect(() => {
		if (!isOpen) {
			setSearch("");
		}
		window.addEventListener("keydown", (event) =>
			closeSearchModal(event, isOpen, setIsOpen),
		);
		window.addEventListener("mousedown", (event) =>
			closeSearchModalOnClick(event, isOpen, setIsOpen, searchModalRef),
		);
		return () => {
			window.removeEventListener("keydown", (event) =>
				closeSearchModal(event, isOpen, setIsOpen),
			);
			window.removeEventListener("mousedown", (event) =>
				closeSearchModalOnClick(event, isOpen, setIsOpen, searchModalRef),
			);
		};
	}, [isOpen]);

	return (
		<>
			<Button
				icon="search"
				aria-label="Search Site"
				onClick={() => setIsOpen(true)}
				className="search__button search-icon"
			>
				<span className="search__button--content">
					{userAgent === "macos" ? "⌘ K" : "Ctrl K"}
				</span>
			</Button>

			<TopNavSearchPanel
				open={isOpen}
				options={options}
				searchModalRef={searchModalRef}
			>
				<TextInput
					aria-label="Search site"
					onChange={(e) => setSearch(e.currentTarget.value)}
					value={search}
					clearable={false}
					endAddon={
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="search-panel__button"
						>
							esc
						</button>
					}
					autoFocus
				/>
			</TopNavSearchPanel>
		</>
	);
};
