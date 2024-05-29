import { Radio, RadioGroup, Shimmer } from "@avaya/neo-react";

import type { ShimmerProps } from "@avaya/neo-react";

import { useMemo, useState } from "react";

import { Playground } from "components/react";

import { defaultHtml, defaultReact, sandbox, storybook } from "../static";
import { createHtmlString, createReactString } from "./helper";

import clsx from "clsx";

import "./style.css";

type RequiredProps = Required<ShimmerProps>;

export const PlaygroundImplementation = () => {
	const [shape, setShape] = useState<RequiredProps["shape"]>("rectangle");
	const [size, setSize] = useState<RequiredProps["size"]>("md");

	const isDefault = useMemo(
		() => shape === "rectangle" && size === "md",
		[shape, size],
	);

	const react = useMemo(() => {
		return createReactString(true, shape, size);
	}, [shape, size]);

	const html = useMemo(
		() => createHtmlString(true, shape, size),
		[shape, size],
	);

	return (
		<div>
			<Playground
				options={
					<Playground.OptionsContainer>
						<Playground.OptionsSection title="Size">
							<RadioGroup
								groupName="Size"
								selected={size as string}
								onChange={(e) =>
									setSize(e.target.value as RequiredProps["size"])
								}
							>
								<Radio value="sm">Small</Radio>
								<Radio value="md">Medium</Radio>
								<Radio value="lg">Large</Radio>
							</RadioGroup>
						</Playground.OptionsSection>
						<Playground.OptionsSection title="Shape">
							<RadioGroup
								groupName="Shape"
								selected={shape as string}
								onChange={(e) =>
									setShape(e.target.value as RequiredProps["shape"])
								}
							>
								<Radio value="rectangle">Rectangle</Radio>
								<Radio value="circle">Circle</Radio>
							</RadioGroup>
						</Playground.OptionsSection>
					</Playground.OptionsContainer>
				}
				examples={{
					html: isDefault ? defaultHtml : html,
					react: isDefault ? defaultReact : react,
					sandbox,
					storybook,
				}}
			>
				<div
					className={clsx(
						shape === "rectangle" && "shimmer-playground-rectangle-wrapper",
					)}
				>
					<Shimmer loopInfinitely size={size} shape={shape || "rectangle"} />
				</div>
			</Playground>
		</div>
	);
};
