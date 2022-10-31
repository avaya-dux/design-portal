import {
  ToastProps,
  Select,
  SelectOption,
  Checkbox,
  TextInput,
} from "@avaya/neo-react";
import clsx from "clsx";
import { useMemo, useState, useEffect } from "react";

import { Playground } from "components";

import { defaultReact, sandbox, storybook } from "./static";

import "./ToastPlayground.css";

export const PlaygroundImplementation = () => {
  const [position, setPosition] = useState<ToastProps["position"]>("top");
  const [icon, setIcon] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [duration, setDuration] = useState<ToastProps["duration"]>(10000);

  const isDefault = useMemo(
    () => position === "top" && !icon && duration === 10000,
    [position, icon, duration]
  );

  const react = useMemo(
    () =>
      `<Toast position={"${position}"} ${
        icon ? `icon={"info"} ` : ""
      }duration={${duration}}>${
        icon ? "This is a toast with an icon" : "This is a Toast"
      }</Toast>`,
    [position, icon, duration]
  );

  const html = useMemo(
    () =>
      `<div class="neo-toast" role="alert" aria-live="polite">
 ${
   icon
     ? `<span class="neo-toast__icon neo-icon-info"></span>
 <div class="neo-toast__message">This is a toast with an icon</div>`
     : `<div class="neo-toast__message">This is a toast</div>`
 }
</div>`,
    [icon]
  );

  useEffect(() => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  }, [duration]);

  return (
    <div>
      <Playground
        options={
          <Playground.OptionsContainer>
            <Playground.OptionsSection title="Position">
              <Select
                aria-label="Toast Position"
                value={position || "top"}
                onChange={(value) =>
                  setPosition(value as ToastProps["position"])
                }
              >
                <SelectOption value="top">Top</SelectOption>
                <SelectOption value="top-left">Top-Left</SelectOption>
                <SelectOption value="top-right">Top-Right</SelectOption>
                <SelectOption value="bottom">Bottom</SelectOption>
                <SelectOption value="bottom-left">Bottom-Left</SelectOption>
                <SelectOption value="bottom-right">Bottom-Right</SelectOption>
              </Select>
            </Playground.OptionsSection>
            <Playground.OptionsSection title="Icon">
              <Checkbox
                label="Icon"
                value="icon"
                checked={icon}
                onChange={() => setIcon(!icon)}
              />
            </Playground.OptionsSection>
            <Playground.OptionsSection title="Duration">
              <TextInput
                value={duration}
                aria-label="Toast Duration"
                onChange={(event) => {
                  setDuration(event.target.value);
                }}
              />
            </Playground.OptionsSection>
          </Playground.OptionsContainer>
        }
        examples={{
          html: html,
          react: isDefault ? defaultReact : react,
          sandbox,
          storybook,
        }}
      >
        {showToast && (
          <div className="toast-playground__wrapper">
            <div
              className={clsx(
                "neo-toast",
                `toast-playground__position--${position}`
              )}
              role="alert"
              aria-live="polite"
            >
              {icon && <span className="neo-toast__icon neo-icon-info"></span>}
              <div className="neo-toast__message">
                {icon ? `This is a toast with an icon` : `This is a toast`}
              </div>
            </div>
          </div>
        )}
      </Playground>
    </div>
  );
};
