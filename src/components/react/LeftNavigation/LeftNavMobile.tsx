import { SideNavigation } from "@avaya/neo-react";

import type { SitePages } from "helpers/types";

export const LeftNavMobile = ({
	allPages,
	currentUrl,
}: {
	allPages: SitePages;
	currentUrl: string;
}) => {
	return (
		<SideNavigation
			aria-label="left-navigation"
			currentUrl={currentUrl}
			isActiveOverride
		>
			<SideNavigation.NavCategory label="Docs">
				{allPages.docs.map((page, index) => (
					<SideNavigation.LinkItem
						key={`doc-${index}`}
						href={page.url as string}
					>
						{page.title}
					</SideNavigation.LinkItem>
				))}
			</SideNavigation.NavCategory>

			<SideNavigation.NavCategory label="Guidelines">
				{allPages.guidelines.map((page, index) => (
					<SideNavigation.LinkItem
						key={`guidelines-${index}`}
						href={page.url as string}
					>
						{page.title}
					</SideNavigation.LinkItem>
				))}
			</SideNavigation.NavCategory>

			<SideNavigation.NavCategory label="Accessibility">
				{allPages.accessibility.map((page, index) => (
					<SideNavigation.LinkItem
						key={`accessibility-${index}`}
						href={page.url as string}
					>
						{page.title}
					</SideNavigation.LinkItem>
				))}
			</SideNavigation.NavCategory>

			<SideNavigation.NavCategory label="Components">
				{allPages.components.map((page, index) => (
					<SideNavigation.LinkItem
						key={`${index}${page.title}`}
						href={page.url as string}
					>
						{page.title}
					</SideNavigation.LinkItem>
				))}
			</SideNavigation.NavCategory>

			<SideNavigation.TopLinkItem key="theIcons" label="Icons" href="/icons" />
		</SideNavigation>
	);
};
