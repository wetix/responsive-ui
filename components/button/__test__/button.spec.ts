import { render } from "@testing-library/svelte";

import Button from "../src/Button.svelte";

describe("Button component", () => {
  const props = {
    class: "custom-class",
    name: "test-button",
    label: "Hello World!",
    style: "width: 100px;",
  };

  const results = render(Button, { props });

  test("shows proper heading when rendered", () => {
    const button = results.getByRole("button");

    expect(() => button).not.toThrow();
    expect(button.classList).toContain("responsive-ui-button");
    expect(button.classList).toContain("custom-class");
    expect(button.getAttribute("type")).toEqual("button");
    expect(button.getAttribute("name")).toEqual(props.name);
    expect(button.getAttribute("style")).toEqual(props.style);
  });
});

//   test("should render component correctly", async () => {

//     const { container, getByText, getByRole, component } = render(Button, {
//       props,
//     });

//     // screen.debug();
//     const button = getByRole("button");

//     expect(button.getAttribute("type")).toEqual("button");
//     expect(button.getAttribute("name")).toEqual(props.name);
//     expect(button.getAttribute("class")).toEqual("responsive-ui-button");
//     expect(button.textContent).toEqual(props.label);

//     await component.$set({ disabled: true, type: "reset" });
//     screen.debug();

//     expect(button.hasAttribute("disabled")).toBeTruthy();
//     expect(button.getAttribute("class")).toContain("disabled");
//     expect(button.getAttribute("type")).toEqual("reset");

//     const { getByTestId } = render(html`
//       <${Button}>
//         <h1 data-testid="slot">Test Data</h1>
//       <//>
//     `);
//     screen.debug();

//     // console.log(getByTestId("slot"));
//     // console.log(expect(getByTestId("slot")).not);

//     // expect(() => results.getByLabelText("another button")).not.toThrow();
//   });
// });
