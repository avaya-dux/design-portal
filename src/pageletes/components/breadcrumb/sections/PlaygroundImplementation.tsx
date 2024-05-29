import {
	Breadcrumbs,
	type BreadcrumbsProps,
	Button,
	Radio,
	RadioGroup,
} from "@avaya/neo-react";
import { Playground } from "components/react";
import {
	prettyPrintReactElementToHtml,
	prettyPrintReactElementToString,
} from "helpers";
import { useMemo, useState } from "react";

const storybook =
	"https://neo-react-library-storybook.netlify.app/?path=/story/components-breadcrumbs";

const sandbox =
	"https://codesandbox.io/s/neo-react-breadcrumbs-tqvmzp?file=/src/App.js";

type ButtonOptions = "yes" | "no";

const currentPage = { href: "#current_page", text: "Current Page" };

const links = [{ href: "#parent1", text: "First Level Page" }];

const buttons = [
	<Button variant="secondary" key="btn1">
		Action 1
	</Button>,
	<Button key="btn2">Action 2</Button>,
];

const getActions = (hasActions: boolean) => {
	return hasActions ? buttons : [];
};

export const PlaygroundImplementation = () => {
	const [hasButtons, setHasButtons] = useState<ButtonOptions>("yes");

	const [element, react, html] = useMemo(() => {
		let props: BreadcrumbsProps = {
			currentPageLink: currentPage,
			links: links,
		};

		const buttons = getActions(hasButtons === "yes");

		if (hasButtons === "yes") {
			props = { ...props, buttons };
		}

		const element = (
			<Breadcrumbs aria-label="Path to current page" {...props} />
		);

		return [
			element,
			prettyPrintReactElementToString(element),
			prettyPrintReactElementToHtml(element),
		];
	}, [hasButtons]);

	return (
		<Playground
			options={
				<Playground.OptionsContainer>
					<Playground.OptionsSection title="Button Options">
						<RadioGroup
							groupName="label-options"
							selected={hasButtons}
							onChange={(e) => {
								setHasButtons(e.target.value as ButtonOptions);
							}}
						>
							<Radio value="yes">With Buttons</Radio>
							<Radio value="no">Without Buttons</Radio>
						</RadioGroup>
					</Playground.OptionsSection>
				</Playground.OptionsContainer>
			}
			examples={{
				html,
				react,
				sandbox,
				storybook,
			}}
		>
			<div style={{ width: "100%", height: "38px" }}>{element}</div>
		</Playground>
	);
};
