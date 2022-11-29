import { Badge, BadgeProps, Radio, RadioGroup } from "@avaya/neo-react";

import { useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

const sandbox = "https://codesandbox.io/s/neo-react-badge-forked-zjf97s";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-badge";

type BadgeTypeOption = "icon" | "text";

export const PlaygroundImplementation = () => {
  const [badgeType, setBadgeType] = useState<BadgeTypeOption>("icon");

  const badgeContent = useMemo(() => {
    if (badgeType == "icon") return <span className="neo-icon-customer" />;
    else return `Badge with Text`;
  }, [badgeType]);

  const react = prettyPrintReact(
    `<Badge
      aria-label="badge with 27 items"
      data="27"
      >
</Badge>`
  );
  const html = prettyPrintHtml(
    `<div>
      <span
        class="neo-badge"
        data-badge="27"
        aria-label="badge with 27 items"
      >
      </span>
    </div>`
  );

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Type">
            <RadioGroup
              groupName="options"
              selected={badgeType}
              onChange={(e) => {
                setBadgeType(e.target.value as BadgeTypeOption);
              }}
            >
              <Radio value="icon">With Icon</Radio>
              <Radio value="text">With Text</Radio>
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
      <Badge data="27" aria-label="text with badge">
        {badgeContent}
      </Badge>
    </Playground>
  );
};
