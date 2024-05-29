import { LeftNav } from "@avaya/neo-react";

import type { SitePages } from "helpers/types";

export const LeftNavMobile = ({
	allPages,
	currentUrl,
}: {
	allPages: SitePages;
	currentUrl: string;
}) => {
	return (
		<LeftNav
			aria-label="left-navigation"
			currentUrl={currentUrl}
			isActiveOverride
		>
			<LeftNav.NavCategory label="Docs">
				{allPages.docs.map((page, index) => (
					<LeftNav.LinkItem key={`doc-${index}`} href={page.url as string}>
						{page.title}
					</LeftNav.LinkItem>
				))}
			</LeftNav.NavCategory>

			<LeftNav.NavCategory label="Guidelines">
				{allPages.guidelines.map((page, index) => (
					<LeftNav.LinkItem
						key={`guidelines-${index}`}
						href={page.url as string}
					>
						{page.title}
					</LeftNav.LinkItem>
				))}
			</LeftNav.NavCategory>

			<LeftNav.NavCategory label="Accessibility">
				{allPages.accessibility.map((page, index) => (
					<LeftNav.LinkItem
						key={`accessibility-${index}`}
						href={page.url as string}
					>
						{page.title}
					</LeftNav.LinkItem>
				))}
			</LeftNav.NavCategory>

			<LeftNav.NavCategory label="Components">
				{allPages.components.map((page, index) => (
					<LeftNav.LinkItem
						key={`${index}${page.title}`}
						href={page.url as string}
					>
						{page.title}
					</LeftNav.LinkItem>
				))}
			</LeftNav.NavCategory>

			<LeftNav.TopLinkItem key="theIcons" label="Icons" href="/icons" />
		</LeftNav>
	);
};
