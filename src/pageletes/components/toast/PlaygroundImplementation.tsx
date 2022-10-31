import {
  ToastProps,
  Checkbox,
  Button,
  Radio,
  RadioGroup,
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
  const [duration, setDuration] = useState<ToastProps["duration"]>(2000);
  const [reloadToast, setReloadToast] = useState<boolean>(false)

  const isDefault = useMemo(
    () => position === "top" && !icon && duration === 2000,
    [position, icon, duration]
  );

  const react = useMemo(
    () =>
      `<Toast position="${position}" ${
        icon ? `icon="info" ` : ""
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

    const toastTimer = setTimeout(() => {
      setShowToast(false);
    }, duration);

    return () => clearTimeout(toastTimer)

  }, [duration, position, icon, reloadToast]);


  return (
    <div>
      <Playground
        options={
          <Playground.OptionsContainer>
            <Playground.OptionsSection title="Position">
              <RadioGroup
                groupName="Position"
                selected={position as string}
                onChange={(e) => {
                  setPosition(e.target.value as ToastProps["position"]);
                }}
              >
                <Radio value="top">Top</Radio>
                <Radio value="top-left">Top-Left</Radio>
                <Radio value="top-right">Top-Right</Radio>
                <Radio value="bottom">Bottom</Radio>
                <Radio value="bottom-left">Bottom-Left</Radio>
                <Radio value="bottom-right">Bottom-Right</Radio>
              </RadioGroup>
            </Playground.OptionsSection>
            <Playground.OptionsSection title="Icon">
              <Checkbox
                label="Icon"
                value="icon"
                checked={icon}
                onChange={() => setIcon(!icon)}
              />
            </Playground.OptionsSection>
            <Playground.OptionsSection title="Duration (seconds)">
              <RadioGroup
                groupName="Duration (seconds)"
                selected={String(duration / 1000)}
                onChange={(event) => {
                  setDuration(Number(event.target.value) * 1000);
                }}
              >
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="5">5</Radio>
              </RadioGroup>
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
          <div className="toast-playground__wrapper">
          <Button onClick={() => setReloadToast(!reloadToast)}>Click to Show Toast</Button>
          {showToast && (
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
          )}
          </div>
      </Playground>
    </div>
  );
};
