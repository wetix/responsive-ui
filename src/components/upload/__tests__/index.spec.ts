import { render } from "@testing-library/svelte";

import Upload from "../index.svelte";

// it("it works", async () => {
//   const { getByText, getByTestId } = render(Upload);

//   console.log(getByText, getByTestId);
//   // const increment = getByText('increment')
//   // const decrement = getByText('decrement')
//   // const counter = getByTestId('counter-value')
// });

describe("index component", () => {
  test("should render component correctly", () => {
    const { container } = render(Upload);

    console.log(container.tagName);
    // expect(container).toContainHTML("<div></div>");
  });
});
