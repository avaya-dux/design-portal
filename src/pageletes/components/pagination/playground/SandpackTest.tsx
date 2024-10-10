import { Button } from "@avaya/neo-react";
import {
	SandpackCodeEditor,
	SandpackPreview,
	SandpackProvider,
} from "@codesandbox/sandpack-react";

import "./SandpackTest.css";

const htmlCodeString = `
<!DOCTYPE html>
<html>
  <head>
    <title>Avaya Neo CSS</title>
    <meta charset="UTF-8" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/@avaya/neo@3.81.16/neo/dist/css/neo/neo.css"
    />
    <link rel="stylesheet" href="./styles.css" />
  </head>

  <body>
    <main class="app neo-global-colors neo-dynamic">
      <div class="neo-pagination__row" id="pagination-:R0:">
        <nav class="neo-pagination neo-pagination__condensed">
          <button
            type="button"
            disabled
            aria-label="previous"
            class="neo-btn-square neo-pagination__arrow-btn neo-icon-chevron-left"
          ></button>
          <div class="pagination__go-to-page">
            <div data-testid="NeoInputWrapper-root" class="neo-form-control">
              <div
                data-testid="NeoInputWrapper-group-root"
                class="neo-input-group"
              >
                <div class="neo-input-editable__wrapper">
                  <input
                    class="neo-input"
                    id=":Rd:"
                    tabindex="0"
                    type="number"
                    aria-label="Go to page"
                    pattern="[0-9]+"
                    min="1"
                    max="5"
                    value="1"
                  />
                </div>
              </div>
            </div>
            <span> / 5 </span>
            <span> pages </span>
          </div>
          <button
            type="button"
            aria-label="next"
            class="neo-btn-square neo-pagination__arrow-btn neo-icon-chevron-right"
          ></button>
        </nav>
      </div>
    </main>
  </body>
</html>`.trim();

const reactCodeString = `
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

const cssString = `
body {
  margin: 0;
}
.app {
  height: 100vh;
	padding: 1rem;
}`.trim();

export const SandpackTest = () => {
	return (
		<div>
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
						"App.tsx": reactCodeString,
						"styles.css": cssString,
					}}
				>
					<div className="playground-examples">
						<SandpackPreview
							actionsChildren={
								<>
									<Button
										style={{ height: 28 }}
										onClick={() =>
											window.alert("TODO: implement: 'how to use this example'")
										}
									>
										INFO ICON
									</Button>

									<Button
										style={{ height: 28 }}
										onClick={() =>
											window.alert("TODO: implement: 'Code copied!'")
										}
									>
										Copy Example Code
									</Button>

									<Button
										style={{ height: 28 }}
										onClick={() =>
											window.alert("TODO: implement: 'Bug reported!'")
										}
									>
										Report bug
									</Button>
								</>
							}
						/>

						<div className="playground-code">
							<SandpackCodeEditor />
						</div>
					</div>
				</SandpackProvider>
			</div>

			<div className="playground-container">
				<SandpackProvider
					template="static"
					theme="auto"
					customSetup={{
						dependencies: {
							"@avaya/neo": "3.81.16",
						},
					}}
					files={{
						"index.html": htmlCodeString,
						"styles.css": cssString,
					}}
				>
					<div className="playground-examples">
						<SandpackPreview
							actionsChildren={
								<>
									<Button
										style={{ height: 28 }}
										onClick={() =>
											window.alert("TODO: implement: 'Bug reported!'")
										}
									>
										COPY EXAMPLE CODE
									</Button>

									<Button
										style={{ height: 28 }}
										onClick={() =>
											window.alert("TODO: implement: 'Bug reported!'")
										}
									>
										Report bug
									</Button>
								</>
							}
						/>

						<div className="playground-code">
							<SandpackCodeEditor />
						</div>
					</div>
				</SandpackProvider>
			</div>
		</div>
	);
};
