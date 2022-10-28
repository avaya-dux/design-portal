import {
  Radio,
  RadioGroup,
  Shimmer,
  ShimmerProps,
  Switch,
} from "@avaya/neo-react";

import { useMemo, useState } from "react";

import clsx from "clsx";

import { Playground } from "components/react";

import { defaultHtml, defaultReact, sandbox, storybook } from "./static";

import "./style.css";

import toDiffableHtml from "diffable-html";

type RequiredProps = Required<ShimmerProps>;

export const PlaygroundImplementation = () => {
  const [loop, setLoop] = useState<RequiredProps["loopInfinitely"]>(true);
  const [shape, setShape] = useState<RequiredProps["shape"]>("rectangle");
  const [size, setSize] = useState<RequiredProps["size"]>("md");

  const isDefault = useMemo(
    () => loop === true && shape === "rectangle" && size === "md",
    [loop, shape, size]
  );

  const react = useMemo(() => {
    return createReactString(loop, shape, size);
  }, [loop, shape, size]);

  const html = useMemo(
    () => createHtmlString(loop, shape, size),
    [loop, shape, size]
  );

  return (
    <div>
      <Playground
        options={
          <Playground.OptionsContainer>
            <Playground.OptionsSection title="Loop Infinitely">
              <Switch
                checked={loop}
                aria-label="loop infinitely"
                onChange={(_e, updatedChecked) => setLoop(updatedChecked)}
              />
            </Playground.OptionsSection>
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
export const getClassName = (loop: boolean, shape: string, size: string) =>
  clsx(
    "neo-shimmer",
    shape === "rectangle" && size === "sm" && "neo-shimmer__rectangle sm",
    shape === "rectangle" && size === "md" && "neo-shimmer__rectangle",
    shape === "rectangle" && size === "lg" && "neo-shimmer__rectangle lg",
    shape === "circle" && size === "sm" && "neo-shimmer__circle--small",
    shape === "circle" && size === "md" && "neo-shimmer__circle--medium",
    shape === "circle" && size === "lg" && "neo-shimmer__circle--large",
    loop === false && "neo-shimmer--3-count"
  );

export const createReactString = (
  loop: boolean,
  shape: string,
  size: string
) => {
  const loopAttr = loop ? "loopInfinitely" : "";
  const sizeAttr = size === "md" ? "" : `size="${size}"`;
  const shapeAttr = shape === "rectangle" ? "" : `shape="${shape}"`;
  return clsx("<Shimmer", loopAttr, sizeAttr, shapeAttr, "/>");
};

export const createHtmlString = (
  loop: boolean,
  shape: string,
  size: string
) => {
  return `<div
  aria-busy="true"
  aria-live="polite"
  role="alert"
  class="${getClassName(loop, shape, size)}"
></div>`;
};
