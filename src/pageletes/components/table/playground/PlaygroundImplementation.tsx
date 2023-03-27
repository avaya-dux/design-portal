import { useMemo, useState } from "react";

import { Playground } from "components/react";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";
import { Table } from "@avaya/neo-react";

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
    { id: 7, name: <a href="#frank">fancy Frank</a>, other: "Lorem Ipsum" },
  ]);

  const [component, react, html] = useMemo(() => {
    const element = (
      <Table
        columns={columns}
        data={data}
        handleRefresh={() => {
          setData(data.slice(1));
        }}
      />
    );

    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [data]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="TODO">
            <div>TODO</div>
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
