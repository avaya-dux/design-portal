import { Button } from "@avaya/neo-react";
import {
	SandpackCodeEditor,
	SandpackPreview,
	SandpackProvider,
} from "@codesandbox/sandpack-react";

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
}`.trim();

export const SandpackTest = () => {
	return (
		<>
			<SandpackProvider
				template="react-ts"
				theme="auto"
				customSetup={{
					dependencies: {
						"@avaya/neo-react": "latest",
					},
				}}
				files={{
					"App.tsx": codeString,
					"styles.css": stylesString,
				}}
			>
				<div>
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
				</div>
				<div>
					<SandpackCodeEditor />
				</div>
			</SandpackProvider>
		</>
	);
};
