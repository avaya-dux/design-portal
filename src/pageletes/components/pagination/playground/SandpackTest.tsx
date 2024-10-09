import {
	Sandpack,
	SandpackCodeEditor,
	SandpackFileExplorer,
	SandpackLayout,
	SandpackPreview,
	SandpackProvider,
} from "@codesandbox/sandpack-react";
import { sandpackDark } from "@codesandbox/sandpack-themes";

const codeString = `
import { useState } from "react";
import { Pagination } from "@avaya/neo-react";

import "@avaya/neo-react/avaya-neo-react.css";

export default function App() {
  const [pageIndex, setPageIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  return (
    <main className="App">
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
    </main>
  );
}
`.trim();

export const SandpackTest = () => {
	return (
		<>
			{/* <Sandpack
				template="react-ts"
				theme={sandpackDark}
				customSetup={{
					dependencies: {
						"@avaya/neo-react": "latest",
					},
				}}
				files={{
					"App.tsx": {
						code: codeString,
						active: true,
					},
				}}
			/> */}

			<SandpackProvider
				template="react-ts"
				// theme={sandpackDark}
				theme="auto"
				customSetup={{
					dependencies: {
						"@avaya/neo-react": "latest",
					},
				}}
				files={{
					"App.tsx": {
						code: codeString,
						active: true,
					},
				}}
			>
				<SandpackLayout>
					<SandpackCodeEditor />
					<SandpackFileExplorer />
					<SandpackPreview
						actionsChildren={
							<button
								type="button"
								onClick={() => window.alert("Bug reported!")}
							>
								Report bug
							</button>
						}
					/>
				</SandpackLayout>
			</SandpackProvider>
		</>
	);
};
