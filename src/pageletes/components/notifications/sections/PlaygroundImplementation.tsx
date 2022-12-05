import { Notification, Radio, RadioGroup } from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";

import { sandbox, storybook } from "../static";

type TypeOption = "default" | "actions" | "timer";

export const PlaygroundImplementation = () => {
  const [typeOption, setTypeOption] = useState<TypeOption>("default");

  const [react, html] = useMemo(() => {
    return [``, ``];
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
