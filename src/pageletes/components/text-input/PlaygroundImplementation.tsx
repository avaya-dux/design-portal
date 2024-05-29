import { Form, Radio, RadioGroup, TextInput } from "@avaya/neo-react";
import {
	prettyPrintReactElementToHtml,
	prettyPrintReactElementToString,
} from "helpers";
import { useState } from "react";

import { Playground } from "components";

const sandbox =
	"https://codesandbox.io/s/neo-react-form-textinput-8jzgr5?file=/src/App.js";
const storybook =
	"https://neo-react-library-storybook.netlify.app/?path=/story/components-text-input--default";

type RequiredType = "true" | "false";
type ToggleHelperText = "on" | "off";
type TextSize = "default" | "small";

export const PlaygroundImplementation = () => {
	const [required, setRequired] = useState<RequiredType>("false");
	const [toggleHelperText, setToggleHelperText] =
		useState<ToggleHelperText>("on");
	const [textSize, setTextSize] = useState<TextSize>("default");

	const element = (
		<Form>
			<TextInput
				label="Label"
				type="text"
				helperText={toggleHelperText === "on" ? "Additional content" : ""}
				required={required === "true"}
				isSmall={textSize === "small"}
			/>
		</Form>
	);

	return (
		<Playground
			options={
				<Playground.OptionsContainer>
					<Playground.OptionsSection title="Input Value">
						<RadioGroup
							groupName="type-options"
							selected={required}
							onChange={(e) => {
								setRequired(e.target.value as RequiredType);
							}}
						>
							<Radio value="false">Optional</Radio>
							<Radio value="true">Required</Radio>
						</RadioGroup>
					</Playground.OptionsSection>

					<Playground.OptionsSection title="Helper Text">
						<RadioGroup
							groupName="value-options"
							selected={toggleHelperText}
							onChange={(e) => {
								setToggleHelperText(e.target.value as ToggleHelperText);
							}}
						>
							<Radio value="on">On</Radio>
							<Radio value="off">Off</Radio>
						</RadioGroup>
					</Playground.OptionsSection>

					<Playground.OptionsSection title="Size">
						<RadioGroup
							groupName="size-options"
							selected={textSize}
							onChange={(e) => {
								setTextSize(e.target.value as TextSize);
							}}
						>
							<Radio value="default">Default</Radio>
							<Radio value="small">Small</Radio>
						</RadioGroup>
					</Playground.OptionsSection>
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
