import {
  Radio,
  RadioGroup,
  Shimmer,
  ShimmerProps,
  Switch,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import clsx from "clsx";
import { Playground } from "components";

import { defaultHtml, defaultReact, sandbox, storybook } from "./static";

import "./style.css";

import toDiffableHtml from "diffable-html";
export const PlaygroundImplementation = () => {
  const [loop, setLoop] = useState<ShimmerProps["loopInfinitely"]>(false);
  const [shape, setShape] = useState<ShimmerProps["shape"]>("rectangle");
  const [size, setSize] = useState<ShimmerProps["size"]>("md");

  const isDefault = useMemo(
    () => loop === false && shape === "rectangle" && size === "md",
    [loop, shape, size]
  );

  const react = useMemo(() => {
    const loopAttr = loop ? "loopInfinitely" : "";
    const sizeAttr = size === "md" ? "" : `size="${size}"`;
    const shapeAttr = shape === "rectangle" ? "" : `shape="${shape}"`;

    return `<Shimmer ${clsx(loopAttr, sizeAttr, shapeAttr)} />`;
  }, [loop, shape, size]);

  const html = useMemo(
    () =>
      `<div
        aria-busy="true"
        aria-live="polite"
        role="alert"
        class="${getClassName(loop, shape, size)}"
    ></div>`,
    [loop, shape, size]
  );

  return (
    <div className="global-margin global-margin--bottom">
      <Playground
        options={
          <Playground.OptionsContainer>
            <Playground.OptionsSection title="Loop Infinitely">
              <Switch
                checked={loop}
                onChange={(_e, updatedChecked) => setLoop(updatedChecked)}
              ></Switch>
            </Playground.OptionsSection>
            <Playground.OptionsSection
              title="Size"
              style={{ gridGap: "0.3rem" }}
            >
              <RadioGroup
                groupName="Size"
                selected={size as string}
                onChange={(_e) =>
                  setSize(_e.target.value as ShimmerProps["size"])
                }
              >
                <Radio value="sm">Small</Radio>
                <Radio value="md">Medium (default)</Radio>
                <Radio value="lg">Large</Radio>
              </RadioGroup>
            </Playground.OptionsSection>
            <Playground.OptionsSection
              title="Shape"
              style={{ gridGap: "0.3rem" }}
            >
              <RadioGroup
                groupName="Shape"
                selected={shape as string}
                onChange={(_e) =>
                  setShape(_e.target.value as ShimmerProps["shape"])
                }
              >
                <Radio value="rectangle">Rectangle (default)</Radio>
                <Radio value="circle">Circle</Radio>
              </RadioGroup>
            </Playground.OptionsSection>
          </Playground.OptionsContainer>
        }
        examples={{
          html: isDefault ? defaultHtml : toDiffableHtml(html),
          react: isDefault ? defaultReact : react,
          sandbox,
          storybook,
        }}
      >
        <div className="shimmer-playground-wrapper">
          <Shimmer
            loopInfinitely={loop || false}
            size={size}
            shape={shape || "rectangle"}
          />
        </div>
      </Playground>
    </div>
  );
};
function getClassName(
  loop: ShimmerProps["loopInfinitely"],
  shape: ShimmerProps["shape"],
  size: ShimmerProps["size"]
) {
  return clsx(
    "neo-shimmer",
    shape === "rectangle" && size === "sm" && "neo-shimmer__rectangle sm",
    shape === "rectangle" && size === "md" && "neo-shimmer__rectangle",
    shape === "rectangle" && size === "lg" && "neo-shimmer__rectangle lg",
    shape === "circle" && size === "sm" && "neo-shimmer__circle--small",
    shape === "circle" && size === "md" && "neo-shimmer__circle--medium",
    shape === "circle" && size === "lg" && "neo-shimmer__circle--large",
    loop === false && "neo-shimmer--3-count"
  );
}
