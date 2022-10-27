import toDiffableHtml from "diffable-html";

import { Playground } from "components";

import { defaultHtml, defaultReact, sandbox, storybook } from "../static";

export const PlaygroundImplementation = () => {
  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Chip Options">
            None
          </Playground.OptionsSection>
        </Playground.OptionsContainer>
      }
      examples={{
        html: toDiffableHtml(defaultHtml),
        react: toDiffableHtml(defaultReact),
        sandbox,
        storybook,
      }}
    >
      <div className="neo-chip neo-chip--default">This</div>
      <div className="neo-chip neo-chip--success">is</div>
      <div className="neo-chip neo-chip--info">a</div>
      <div className="neo-chip neo-chip--alert">placeholder</div>
      <div className="neo-chip neo-chip--warning">example</div>
    </Playground>
  );
};
