import {
  Radio,
  RadioGroup,
  Pagination,
} from "@avaya/neo-react";

import {useState, useLayoutEffect, useRef} from "react";

import { Playground } from "components/react";

import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

const storybook =
"https://neo-react-library-storybook.netlify.app/?path=/story/components-checkbox";

const sandbox = "https://codesandbox.io/s/neo-react-checkbox-kb5gbt";

type PaginationTypeOption = "full" | "condensed";

export const PlaygroundImplementation = () => {

  const [paginationOption, setPaginationOption] = useState<PaginationTypeOption>("full");
  const [setIndex, setPageIndex] = useState(1);
  console.log("setIndex: ", setIndex);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const itemCount = 20;

  const [rootWidth, setRootWidth] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updateRootWidth = () => {
      if (rootRef.current) {
        setRootWidth(rootRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", updateRootWidth);
    updateRootWidth();
    return () => window.removeEventListener("resize", updateRootWidth);
  }, [rootRef]);

  const element = (
    <Pagination 
      currentPageIndex={setIndex}
      itemCount={itemCount}
      itemsPerPage={itemsPerPage}
      itemsPerPageOptions={[1, 5, 10]}
      itemDisplayType={'page'}
      paginationRootWidth={rootWidth}

      onPageChange={(e, newIndex) => {
        console.log("OnPage: ", newIndex);
        e?.preventDefault();
        setPageIndex(newIndex);
      }}

      onItemsPerPageChange={(e, newItemsPerPage) => {
        e?.preventDefault();
        setItemsPerPage(newItemsPerPage);

        const maxPageIndex = Math.ceil(
          itemCount / newItemsPerPage
        );
        if (setIndex > maxPageIndex) {
          setPageIndex(maxPageIndex);
        }
      }}
    />
  );

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Pagination Options">
            <RadioGroup
              groupName="options"
              selected={paginationOption}
              onChange={(e) => {
                setPaginationOption(e.target.value as PaginationTypeOption);
              }}
            >
              <Radio value="full">Full</Radio>
              <Radio value="condensed">Condensed</Radio>
            </RadioGroup>
          </Playground.OptionsSection>
        </Playground.OptionsContainer>
      }
      examples={{
        html: prettyPrintReactElementToHtml(element),
        react: prettyPrintReactElementToString(element),
        sandbox,
        storybook,
      }}
    >
      {element}
    </Playground>
  );
};
