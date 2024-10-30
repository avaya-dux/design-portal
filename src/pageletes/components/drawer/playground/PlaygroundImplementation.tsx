import {
	Button,
	Drawer,
} from "@avaya/neo-react";

import { useEffect, useMemo, useState } from "react";

import { Playground } from "components";
import {
	prettyPrintReactElementToHtml,
	prettyPrintReactElementToString,
} from "helpers";

export const sandbox = "https://codesandbox.io/s/";
export const storybook =
	"https://neo-react-library-storybook.netlify.app/?path=/story/";


export const PlaygroundImplementation = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [component, react, html] = useMemo(() => {
		const element = (
			<Button
				onClick={() => setIsOpen(true)}
			>
				Open Drawer
			</Button>
		);

		return [
			element,
			prettyPrintReactElementToString(element, { filterProps: ["onClick"] }),
			prettyPrintReactElementToHtml(element),
		];
	}, []);

	const [elementToRender, setElementToRender] = useState(component);

	// biome-ignore lint/correctness/useExhaustiveDependencies: must update component when props change
	useEffect(() => {
		setElementToRender(component);
	}, [isOpen, component]);

	return (
		<>
			<Playground
				options={
					<Playground.OptionsContainer>
						<Playground.OptionsSection title="Variables">
							<div>Nothing here</div>
						</Playground.OptionsSection>
					</Playground.OptionsContainer>
				}
				examples={{
					react,
					html,
					sandbox,
					storybook,
				}}
			>
				{elementToRender}
			</Playground>
			<Drawer
				open={isOpen}
				onClose={() => setIsOpen(false)}
				title="Title of Drawer"
			>
				<div style={{ height: "100%", width: "100%" }}>
					<p>This Drawer should only have the x close button</p>
					<br />
					<p>
						Dismiss the Drawer by selecting the ‘Clear’ icon at the top right
						next to the title or by clicking anywhere on the background scrim.
					</p>
				</div>
			</Drawer>
		</>
	);
};
