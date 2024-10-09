import { Button } from "@avaya/neo-react";
import {
	SandpackCodeEditor,
	SandpackPreview,
	SandpackProvider,
} from "@codesandbox/sandpack-react";

import "./SandpackTest.css";

const codeString = `
import { useState } from "react";
import { Pagination, NeoThemeProvider } from "@avaya/neo-react";

import "@avaya/neo-react/avaya-neo-react.css";
import './styles.css'

export default function App() {
  const [pageIndex, setPageIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  return (
    <NeoThemeProvider initialMode="dynamic" className="app">
      <Pagination
        pagesText="pages"
        itemCount={5000}
        itemsPerPage={itemsPerPage}
        currentPageIndex={pageIndex}
        onPageChange={(_, newIndex) => setPageIndex(newIndex)}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);

          if (itemsPerPage < newItemsPerPage && pageIndex > 1) {
            const { itemCount } = rest;
            const lastPage = Math.ceil(itemCount / newItemsPerPage);
            setPageIndex(lastPage);
          }
        }}
      />
    </NeoThemeProvider>
  );
}`.trim();

const stylesString = `
body {
  margin: 0;
}
.app {
  height: 100vh;
	padding: 1rem;
}`.trim();

export const SandpackTest = () => {
	return (
		<div className="playground-container">
			<SandpackProvider
				template="react-ts"
				theme="auto"
				customSetup={{
					dependencies: {
						"@avaya/neo-react": "1.3.5",
					},
				}}
				files={{
					"App.tsx": codeString,
					"styles.css": stylesString,
				}}
			>
				<div className="playground-examples">
					<SandpackPreview
						actionsChildren={
							<Button
								style={{ height: 28 }}
								onClick={() => window.alert("Bug reported!")}
							>
								Report bug
							</Button>
						}
					/>

					<div className="playground-code">
						<SandpackCodeEditor />
					</div>
				</div>
			</SandpackProvider>
		</div>
	);
};
