import {
	Button,
	Drawer,
} from "@avaya/neo-react";

import "./playground.css";

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
	const [basicOpen, setBasicOpen] = useState<boolean>(false);
	const [actionsOpen, setActionsOpen] = useState<boolean>(false);

	const [buttons, basicDrawer, actionsDrawer, react, html] = useMemo(() => {
		const element = (
			<div className="button-container">
				<Button onClick={() => setActionsOpen(true)}>Actionable Drawer</Button>
				<Button onClick={() => setBasicOpen(true)}>Informative Drawer</Button>
			</div>
		);

		const BasicDrawer = (
			<Drawer
				open={basicOpen}
				onClose={() => setBasicOpen(false)}
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
		);

		const ActionsDrawer = (
			<Drawer
				open={actionsOpen}
				onClose={() => setActionsOpen(false)}
				title="Actions Drawer"
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
		);


		return [
			element,
			BasicDrawer,
			ActionsDrawer,
			prettyPrintReactElementToString(BasicDrawer, {
				filterProps: ["onClick"],
			}),
			prettyPrintReactElementToHtml(BasicDrawer),
		];
	}, [actionsOpen, basicOpen]);

	const [elementToRender, setElementToRender] = useState(buttons);

	// biome-ignore lint/correctness/useExhaustiveDependencies: must update component when props change
	useEffect(() => {
		setElementToRender(buttons);
	}, [basicOpen, buttons]);

	return (
		<>
			<Playground
				examples={{
					react,
					html,
					sandbox,
					storybook,
				}}
			>
				{elementToRender}
			</Playground>
			{basicDrawer}
			{actionsDrawer}
		</>
	);
};
