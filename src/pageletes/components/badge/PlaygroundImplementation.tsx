import { Badge, Icon, Radio, RadioGroup } from "@avaya/neo-react";

import { useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

const sandbox = "https://codesandbox.io/s/neo-react-badge-zjf97s";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-badge";

type BadgeTypeOption = "icon" | "text";

export const PlaygroundImplementation = () => {
  const [badgeType, setBadgeType] = useState<BadgeTypeOption>("icon");

  const badgeContent = useMemo(() => {
    if (badgeType === "icon") return <Icon icon="customer" aria-label="customer icon" />;
    else return "Badge with Text";
  }, [badgeType]);

  const [isWithIcon, reactWithIcon, reactWithText, htmlWithIcon, htmlWithText] =
    useMemo(() => {
      const isWithIcon = badgeType === "icon";

      const reactWithIcon = prettyPrintReact(
        `<Badge
  aria-label="badge with 27 items"
  data="27"
>
  <Icon icon="customer" aria-label="customer icon" />
</Badge>`
      );

      const reactWithText = prettyPrintReact(
        `<Badge
  aria-label="badge with 27 items"
  data="27"
>
  Badge with Text
</Badge>`
      );

      const htmlWithIcon = `<div>
  <span
    class="neo-badge"
    data-badge="27"
    aria-label="badge with 27 items"
  >
    <span class="neo-icon-customer" aria-label="customer icon" />
  </span>
</div>`;

      const htmlWithText = prettyPrintHtml(
        `<div>
            <span
            class="neo-badge"
            data-badge="27"
            aria-label="badge with 27 items"
            >
            Badge with Text
            </span>
            </div>`
      );
      return [
        isWithIcon,
        reactWithIcon,
        reactWithText,
        htmlWithIcon,
        htmlWithText,
      ];
    }, [badgeType]);

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
        html: isWithIcon ? htmlWithIcon : htmlWithText,
        react: isWithIcon ? reactWithIcon : reactWithText,
        sandbox,
        storybook,
      }}
    >
      <Badge data="27" aria-label="badge with 27 items">
        {badgeContent}
      </Badge>
    </Playground>
  );
};
