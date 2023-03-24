import { Notification, Radio, RadioGroup } from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

export const sandbox =
  "https://codesandbox.io/s/neo-react-notifications-dcplsu?file=/src/App.js";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-notification";

type TypeOption = "default" | "actions" | "timer";

export const PlaygroundImplementation = () => {
  const [typeOption, setTypeOption] = useState<TypeOption>("default");

  const [react, html] = useMemo(() => {
    let reactCode = "";
    let htmlCode = "";

    switch (typeOption) {
      case "actions":
        reactCode = prettyPrintReact(`
<Notification
  type="event"
  icon="info"
  header="Alternate Options"
  description="You can override the default action with your own"
  action={{
    buttons: [
      { children: "Edit", onClick: () => alert("Edit Clicked") },
      { children: "Alert", onClick: () => alert("Alert Clicked") },
    ],
  }}
/>
<Notification
  type="event"
  icon="info"
  header="Additional Click Handler"
  description="You can also add a click handler to the notification close event"
  action={{
    onClick: () => alert("Close Clicked"),
  }}
/>
        `);

        htmlCode = prettyPrintHtml(
          `<div class="neo-notification neo-notification--event" role="alert" aria-live="polite"><div role="img" class="neo-notification__icon neo-icon-info" aria-label="icon info"></div><div class="neo-notification__message"><div class="neo-notification__title">Alternate Options</div><div class="neo-notification__description">You can override the default action with your own</div></div><div class="neo-notification__options"><button class="neo-btn neo-btn--default neo-btn-secondary neo-btn-secondary--default">Edit</button><button class="neo-btn neo-btn--default neo-btn-secondary neo-btn-secondary--default">Alert</button></div></div><div class="neo-notification neo-notification--event" role="alert" aria-live="polite"><div role="img" class="neo-notification__icon neo-icon-info" aria-label="icon info"></div><div class="neo-notification__message"><div class="neo-notification__title">Additional Click Handler</div><div class="neo-notification__description">You can also add a click handler to the notification close event</div></div><button aria-label="close notification" class="neo-icon-end"></button></div>`
        );
        break;

      case "timer":
        reactCode = prettyPrintReact(`
<Notification
  type="info"
  icon="info"
  header="Timer Notification"
  description="You can pass a 'count' action to display a timer, but you must increment the timer yourself"
  action={{ count: "12:34:56" }}
/>
        `);

        htmlCode = prettyPrintHtml(
          `<div class="neo-notification neo-notification--info" role="alert" aria-live="polite"><div role="img" class="neo-notification__icon neo-icon-info" aria-label="icon info"></div><div class="neo-notification__message"><div class="neo-notification__title">Timer Notification</div><div class="neo-notification__description">You can pass a 'count' action to display a timer, but you must increment the timer yourself</div></div><div class="neo-notification__counter">12:34:56</div></div>`
        );
        break;

      default:
        reactCode = prettyPrintReact(`
<Notification
  icon="check"
  type="success"
  header="Success"
  description="Successful action completed"
/>
<Notification
  icon="warning"
  type="warning"
  header="Warning"
  description="This is a warning"
/>
<Notification
  icon="alert"
  type="alert"
  header="Alert"
  description="This is an alert"
/>
<Notification
  icon="info"
  type="info"
  header="Info"
  description="This is some info"
/>
<Notification
  icon="copy"
  type="event"
  header="Event"
  description="This is an event"
/>
        `);

        htmlCode = prettyPrintHtml(
          `<div class="neo-notification neo-notification--success" role="alert" aria-live="polite"><div role="img" class="neo-notification__icon neo-icon-check" aria-label="icon check"></div><div class="neo-notification__message"><div class="neo-notification__title">Success</div><div class="neo-notification__description">Successful action completed</div></div><button aria-label="close notification" class="neo-icon-end"></button></div><div class="neo-notification neo-notification--warning" role="alert" aria-live="polite"><div role="img" class="neo-notification__icon neo-icon-warning" aria-label="icon warning"></div><div class="neo-notification__message"><div class="neo-notification__title">Warning</div><div class="neo-notification__description">This is a warning</div></div><button aria-label="close notification" class="neo-icon-end"></button></div><div class="neo-notification neo-notification--alert" role="alert" aria-live="polite"><div role="img" class="neo-notification__icon neo-icon-alert" aria-label="icon alert"></div><div class="neo-notification__message"><div class="neo-notification__title">Alert</div><div class="neo-notification__description">This is an alert</div></div><button aria-label="close notification" class="neo-icon-end"></button></div><div class="neo-notification neo-notification--info" role="alert" aria-live="polite"><div role="img" class="neo-notification__icon neo-icon-info" aria-label="icon info"></div><div class="neo-notification__message"><div class="neo-notification__title">Info</div><div class="neo-notification__description">This is some info</div></div><button aria-label="close notification" class="neo-icon-end"></button></div><div class="neo-notification neo-notification--event" role="alert" aria-live="polite"><div role="img" class="neo-notification__icon neo-icon-copy" aria-label="icon copy"></div><div class="neo-notification__message"><div class="neo-notification__title">Event</div><div class="neo-notification__description">This is an event</div></div><button aria-label="close notification" class="neo-icon-end"></button></div>`
        );
        break;
    }

    return [reactCode, htmlCode];
  }, [typeOption]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Type">
            <RadioGroup
              groupName="type-options"
              selected={typeOption}
              onChange={(e) => {
                setTypeOption(e.target.value as TypeOption);
              }}
            >
              <Radio value="default">Default</Radio>
              <Radio value="actions">Actions</Radio>
              <Radio value="timer">Timer</Radio>
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
      <div style={{ width: "100%" }}>
        {typeOption === "default" && (
          <>
            <Notification
              icon="check"
              type="success"
              header="Success"
              description="Successful action completed"
            />
            <Notification
              icon="warning"
              type="warning"
              header="Warning"
              description="This is a warning"
            />
            <Notification
              icon="alert"
              type="alert"
              header="Alert"
              description="This is an alert"
            />
            <Notification
              icon="info"
              type="info"
              header="Info"
              description="This is some info"
            />
            <Notification
              icon="copy"
              type="event"
              header="Event"
              description="This is an event"
            />
          </>
        )}

        {typeOption === "actions" && (
          <>
            <Notification
              type="event"
              icon="info"
              header="Alternate Options"
              description="You can override the default action with your own"
              action={{
                buttons: [
                  { children: "Edit", onClick: () => alert("Edit Clicked") },
                  { children: "Alert", onClick: () => alert("Alert Clicked") },
                ],
              }}
            />
            <Notification
              type="event"
              icon="info"
              header="Additional Click Handler"
              description="You can also add a click handler to the notification close event"
              action={{
                onClick: () => alert("Close Clicked"),
              }}
            />
          </>
        )}

        {typeOption === "timer" && (
          <Notification
            type="info"
            icon="info"
            header="Timer Notification"
            description="You can pass a 'count' action to display a timer, but you must increment the timer yourself"
            action={{ count: "12:34:56" }}
          />
        )}
      </div>
    </Playground>
  );
};
