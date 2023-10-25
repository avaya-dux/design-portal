import { Fragment, useState, useMemo } from "react";
import { Playground } from "components/react";
import {
  AgentCard,
  Avatar,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  Radio,
  RadioGroup,
  TopNav,
  type TopNavProps,
} from "@avaya/neo-react";

import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

import logoImage from "../imgs/logo-condensed-light.svg";
import "./PlaygroundImplementation.css";

const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-topnav";

const sandbox = "https://codesandbox.io/s/";

type UserStatusType = "card" | "avatar";

const Logo = (
  <a href="/" title="Logo Link">
    <Image src={logoImage.src} isDecorativeOrBranding />
  </a>
);

const AgentStatusCard = (
  <AgentCard
    agentName="Bob Boberson"
    agentStatus="connected"
    avatar={<Avatar />}
  />
);

const AgentAvatar = (
  <Fragment key="the-avatar">
    <TopNav.Avatar
      avatar={<Avatar initials="MD" />}
      dropdown={
        <Menu
          itemAlignment="left"
          menuRootElement={
            <MenuButton onClick={function Ha() {}}>Functional Menu</MenuButton>
          }
        >
          <MenuItem>Settings</MenuItem>
          <MenuItem>Log Out</MenuItem>
        </Menu>
      }
    />
  </Fragment>
);

const getAgentComponent = (isAgentCard: boolean | undefined) => {
  return isAgentCard ? AgentStatusCard : AgentAvatar;
};

export const PlaygroundImplementation = () => {
  const [statusType, setStatusType] = useState<UserStatusType>("avatar");

  const [element, react, html] = useMemo(() => {
    let props: TopNavProps = {
      logo: Logo,
    };

    const AgentComponent = getAgentComponent(statusType === "card");

    const element = (
      <div className="playground-topnav">
        <TopNav aria-label="Main header" {...props}>
          {AgentComponent}
        </TopNav>
      </div>
    );

    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [statusType]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="User Options">
            <RadioGroup
              groupName="user-options"
              selected={statusType}
              onChange={(e) => {
                setStatusType(e.target.value as UserStatusType);
              }}
            >
              <Radio value="avatar">Avatar</Radio>
              <Radio value="card">Agent Card</Radio>
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
      {element}
    </Playground>
  );
};
