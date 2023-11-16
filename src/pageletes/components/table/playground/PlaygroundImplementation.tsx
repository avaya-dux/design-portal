import { Checkbox, CheckboxGroup, Table } from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components/react";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

import styles from "./PlaygroundImplementation.module.css";

const sandbox = "https://codesandbox.io/s/neo-react-table-p3yczb";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-table";

const columns = [
  {
    Header: "name header",
    accessor: "name",
  },
  {
    Header: "other header",
    accessor: "other",
  },
];

export const PlaygroundImplementation = () => {
  const [data, setData] = useState([
    { id: 1, name: "sir Fred", other: "Lorem Ipsum" },
    { id: 2, name: "sir Daniel", other: "Lorem Ipsum" },
    { id: 3, name: "madam Tif", other: "Lorem Ipsum" },
    { id: 4, name: "madam Hailey", other: "Lorem Ipsum" },
    { id: 5, name: "intersex Alex", other: "Lorem Ipsum" },
    { id: 6, name: "androgynous Skyler", other: "Lorem Ipsum" },
    { id: 7, name: "fancy Frank", other: "Lorem Ipsum" },
  ]);
  const [compact, setCompact] = useState(false);
  const [selectable, setSelectable] = useState(false);
  const [showPagination, setShowPagination] = useState(false);

  const [component, react, html] = useMemo(() => {
    const element = (
      <Table
        columns={columns}
        data={data}
        handleRefresh={() => setData(data.slice(1))}
        rowHeight={compact ? "compact" : "large"}
        selectableRows={selectable ? "single" : "none"}
        showPagination={showPagination}
      />
    );

    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [compact, data, selectable, showPagination]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection
            id="table-state-variables-title"
            title="Variables"
          >
            <CheckboxGroup
              groupName="table-state-variables"
              aria-labelledby="table-state-variables-title"
            >
              <Checkbox value="compact" onChange={() => setCompact(!compact)}>
                Compact
              </Checkbox>

              <Checkbox
                value="selectable"
                onChange={() => setSelectable(!selectable)}
              >
                Selectable
              </Checkbox>

              <Checkbox
                value="show-pagination"
                onChange={() => setShowPagination(!showPagination)}
              >
                Show Pagination
              </Checkbox>
            </CheckboxGroup>
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
      <div className={styles["table-playground-implementation-wrapper"]}>
        {component}
      </div>
    </Playground>
  );
};
