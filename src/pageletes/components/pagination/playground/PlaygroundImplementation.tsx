import { Pagination } from "@avaya/neo-react";
import "./pagination-playground.css";
import { useState } from "react";

import { Playground } from "components/react";

import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/docs/components-pagination--docs";

const sandbox = "https://codesandbox.io/s/neo-react-pagination-r7ffxy?file=/src/App.js";

export const PlaygroundImplementation = () => {
  const [setIndex, setPageIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const itemCount = 100;

  const element = (
    <Pagination
      currentPageIndex={setIndex}
      alwaysShowPagination={true}
      itemCount={itemCount}
      itemsPerPage={itemsPerPage}
      itemsPerPageOptions={[20, 50, 100]}
      itemDisplayType={"count"}
      itemsPerPageLabel={"items"}
      onPageChange={(e, newIndex) => {
        e?.preventDefault();
        setPageIndex(newIndex);
      }}
      onItemsPerPageChange={(e, newItemsPerPage) => {
        e?.preventDefault();
        setItemsPerPage(newItemsPerPage);

        const maxPageIndex = Math.ceil(itemCount / newItemsPerPage);
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
