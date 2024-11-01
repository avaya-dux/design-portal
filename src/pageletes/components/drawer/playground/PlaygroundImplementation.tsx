import { Button, Drawer } from "@avaya/neo-react";

import "./playground.css";

import { useMemo, useState } from "react";

import { Playground } from "components";
import {
	prettyPrintReactElementToHtml,
	prettyPrintReactElementToString,
} from "helpers";

export const sandbox =
	"https://codesandbox.io/p/sandbox/neo-react-drawer-8sjp45";
export const storybook =
	"https://neo-react-library-storybook.netlify.app/?path=/docs/components-drawer--docs";

export const PlaygroundImplementation = () => {
	const [informativeOpen, setInformativeOpen] = useState<boolean>(false);
	const [actionableOpen, setActionableOpen] = useState<boolean>(false);

	const [buttons, informativeDrawer, actionableDrawer, react, html] =
		useMemo(() => {
			const buttonGroup = (
				<div className="button-container">
					<Button onClick={() => setActionableOpen(true)}>
						Actionable Drawer
					</Button>
					<Button onClick={() => setInformativeOpen(true)}>
						Informative Drawer
					</Button>
				</div>
			);

			const BasicDrawer = (
				<Drawer
					open={informativeOpen}
					onClose={() => setInformativeOpen(false)}
					title="Title of Drawer"
				>
					<div>
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
					open={actionableOpen}
					onCancel={() => setActionableOpen(false)}
					onApply={() => {
						alert("Apply button clicked");
						setActionableOpen(false);
					}}
					title="Actionable Drawer"
				>
					<div>
						<p>You can place any content here.</p>
						<br />
						<p>
							Dismiss the Drawer by selecting the Cancel button. Override
							onApply to provide your implementation.
						</p>
					</div>
				</Drawer>
			);

			return [
				buttonGroup,
				BasicDrawer,
				ActionsDrawer,
				prettyPrintReactElementToString(BasicDrawer, {
					filterProps: ["onClose"],
				}),
				prettyPrintReactElementToHtml(BasicDrawer),
			];
		}, [actionableOpen, informativeOpen]);

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
				{buttons}
			</Playground>
			{informativeDrawer}
			{actionableDrawer}
		</>
	);
};
