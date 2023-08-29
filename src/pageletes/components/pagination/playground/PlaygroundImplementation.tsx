import {
  Radio,
  RadioGroup,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components/react";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

import { defaultHtml, defaultReact, sandbox, storybook } from "../static";

type PaginationTypeOption = "default" | "icon";

export const PlaygroundImplementation = () => {
  const [paginationType, setPaginationType] =
    useState<PaginationTypeOption>("default");

  const [parentMenuIsOpen, setParentMenuIsOpen] = useState<boolean>(false);

  const [subMenuIsOpen, setSubMenuIsOpen] = useState<boolean>(false);

  const [react, html] = useMemo(() => {
    const isDefault = paginationType === "default" && !parentMenuIsOpen;

    const reactCode = prettyPrintReact(
      `<button class="neo-btn neo-btn-primary neo-btn-primary--default">default</button>`,
    );

    const htmlCode = prettyPrintHtml(
      `<button class="neo-btn neo-btn-primary neo-btn-primary--default">default</button>`,
    );

    return isDefault ? [defaultReact, defaultHtml] : [reactCode, htmlCode];
  }, [paginationType, parentMenuIsOpen, subMenuIsOpen]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Pagination Options">
            <RadioGroup
              groupName="options"
              selected={paginationType}
              onChange={(e) => {
                setPaginationType(e.target.value as PaginationTypeOption);
              }}
            >
              <Radio value="full">Full</Radio>
              <Radio value="condensed">Condensed</Radio>
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
    </Playground>
  );
};
