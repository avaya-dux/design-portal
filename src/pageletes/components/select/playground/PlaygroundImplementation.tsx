import type { SelectProps } from "@avaya/neo-react";
import {
	Checkbox,
	CheckboxGroup,
	Radio,
	RadioGroup,
	Select,
	SelectOption,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components/react";
import {
	prettyPrintReactElementToHtml,
	prettyPrintReactElementToString,
} from "helpers";

const sandbox = "https://codesandbox.io/s/neo-react-select-05kbd5";
const storybook =
	"https://neo-react-library-storybook.netlify.app/?path=/story/components-select--basic-selects";

const fruitOptions = [
	<SelectOption value="apple" key="apple">
		Apple
	</SelectOption>,
	<SelectOption value="gravel" key="gravel" helperText="Not a Fruit" disabled>
		Gravel
	</SelectOption>,
	<SelectOption value="broccoli" key="broccoli" helperText="Vegetable">
		Broccoli
	</SelectOption>,
	<SelectOption value="banana" key="banana">
		Banana
	</SelectOption>,
	<SelectOption value="pear" key="pear">
		Pear
	</SelectOption>,
	<SelectOption value="blueberries" key="blueberries">
		Blueberries
	</SelectOption>,
	<SelectOption value="grapes" key="grapes">
		Grapes
	</SelectOption>,
	<SelectOption value="oranges" key="oranges">
		Oranges
	</SelectOption>,
];

export const PlaygroundImplementation = () => {
	const [hasError, setHasError] = useState(false);
	const [hasHelperText, setHasHelperText] = useState(true);
	const [hasVisibleLabel, setHasVisibleLabel] = useState(true);
	const [isDisabled, setIsDisabled] = useState(false);
	const [multiple, setMultiple] = useState(false);
	const [size, setSize] = useState<SelectProps["size"]>("md");

	const [component, react, html] = useMemo(() => {
		const element = (
			<Select
				aria-label={!hasVisibleLabel ? "Select a favorite food" : ""}
				disabled={isDisabled}
				errorList={hasError ? ["Invalid selection"] : []}
				helperText={
					hasHelperText && !hasError ? "Please select one" : undefined
				}
				label={hasVisibleLabel ? "Select a favorite food" : undefined}
				multiple={multiple}
				size={size}
			>
				{fruitOptions}
			</Select>
		);

		return [
			element,
			prettyPrintReactElementToString(element),
			prettyPrintReactElementToHtml(element),
		];
	}, [hasError, hasHelperText, hasVisibleLabel, isDisabled, multiple, size]);

	return (
		<Playground
			options={
				<Playground.OptionsContainer>
					<Playground.OptionsSection title="Type">
						<Select
							aria-label="Type of Select"
							defaultValue="single"
							onChange={(value) => {
								setMultiple(value === "multiple");
							}}
						>
							<SelectOption value="single">Single</SelectOption>
							<SelectOption value="multiple">Multiple</SelectOption>
						</Select>
					</Playground.OptionsSection>

					<Playground.OptionsSection
						id="select-state-options-title"
						title="States"
					>
						<CheckboxGroup
							groupName="select-state-options"
							aria-labelledby="select-state-options-title"
						>
							<Checkbox value="error" onChange={() => setHasError(!hasError)}>
								Error
							</Checkbox>
							<Checkbox
								value="disabled"
								onChange={() => setIsDisabled(!isDisabled)}
							>
								Disabled
							</Checkbox>
						</CheckboxGroup>
					</Playground.OptionsSection>

					<Playground.OptionsSection
						id="select-state-variables-title"
						title="Variables"
					>
						<CheckboxGroup
							groupName="select-state-variables"
							aria-labelledby="select-state-variables-title"
						>
							<Checkbox
								value="label"
								checked={hasVisibleLabel}
								onChange={() => setHasVisibleLabel(!hasVisibleLabel)}
							>
								Label
							</Checkbox>
							<Checkbox
								value="helper-text"
								checked={hasHelperText}
								onChange={() => setHasHelperText(!hasHelperText)}
							>
								Helper Text
							</Checkbox>
						</CheckboxGroup>
					</Playground.OptionsSection>

					<Playground.OptionsSection title="Size">
						<RadioGroup
							groupName="select-size"
							selected={size}
							onChange={(e) => {
								const updatedSize = e.target.value as SelectProps["size"];
								setSize(updatedSize);
							}}
						>
							<Radio value="sm">Small</Radio>
							<Radio value="md">Medium</Radio>
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
			<div style={{ width: "100%", maxWidth: "300px" }}>{component}</div>
		</Playground>
	);
};
