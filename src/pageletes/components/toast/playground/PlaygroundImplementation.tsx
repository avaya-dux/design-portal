import {
  Checkbox,
  Button,
} from "@avaya/neo-react";
import clsx from "clsx";
import { useMemo, useState, useEffect } from "react";

import { Playground } from "components";

import "./ToastPlayground.css";

const defaultReact = `<Toast position="top" duration={2000}>This is a toast</Toast>`;
const sandbox = "https://codesandbox.io/s/neo-react-toast-hdlfn9";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-toast--default";

export const PlaygroundImplementation = () => {
  const [icon, setIcon] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [reloadToast, setReloadToast] = useState<boolean>(false);

  const isDefault = useMemo(
    () => !icon,
    [icon],
  );

  const react = useMemo(
    () =>
      `<Toast position="top" ${
        icon ? `icon="info" ` : ""
      }duration={2000}>${
        icon ? "This is a toast with an icon" : "This is a Toast"
      }</Toast>`,
    [icon],
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
    [icon],
  );

  useEffect(() => {
    setShowToast(true);

    const toastTimer = setTimeout(() => {
      setShowToast(false);
    }, 2000);

    return () => clearTimeout(toastTimer);
  }, [icon, reloadToast]);

  return (
    <div>
      <Playground
        options={
          <Playground.OptionsContainer>
            <Playground.OptionsSection title="Variations">
              <Checkbox
                value="icon"
                checked={icon}
                onChange={() => setIcon(!icon)}
              >
                Icon
              </Checkbox>
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
          <Button onClick={() => setReloadToast(!reloadToast)}>
            Click to Show Toast
          </Button>
          {showToast && (
            <div
              className={clsx(
                "neo-toast",
                `toast-playground__position--top`,
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
