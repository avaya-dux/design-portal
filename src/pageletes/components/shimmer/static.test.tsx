import { topics } from "./static";

describe("static test", () => {
	it("anchors has playground defined", () => {
		expect(topics.playground).toBeDefined();
	});
});
