import { Button, Drawer } from "@avaya/neo-react";
import { useState } from "react";

import { Playground } from "components/react";
import {
	prettyPrintReactElementToHtml,
	prettyPrintReactElementToString,
} from "helpers";

const storybook =
	"https://neo-react-library-storybook.netlify.app/?path=/docs/components-drawer--docs";

const sandbox = "https://codesandbox.io/p/sandbox/neo-react-drawer-8sjp45";

export const PlaygroundImplementation = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const element = (
		<section>
			<Button
				onClick={() => {
					setDrawerOpen(true);
				}}
			>
				Open Drawer
			</Button>

			<Drawer
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				title="Chat History"
			>
				<p>ping</p>
			</Drawer>
		</section>
	);

	return (
		<Playground
			options={
				<Playground.OptionsContainer>
					<Playground.OptionsSection title="Drawer Options" />
				</Playground.OptionsContainer>
			}
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
