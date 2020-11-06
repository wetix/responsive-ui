import { render, screen } from "@testing-library/svelte";
import html from "svelte-htm";

import Button from "../index.svelte";

describe("index component", () => {
  test("should render component correctly", async () => {
    const props = {
      name: "test-button",
      title: "Hello World!",
    };
    const { container, getByText, getByRole, component } = render(Button, {
      props,
    });

    // screen.debug();
    const button = getByRole("button");

    expect(button.getAttribute("type")).toEqual("button");
    expect(button.getAttribute("name")).toEqual(props.name);
    expect(button.getAttribute("class")).toEqual("ditto-button");
    expect(button.textContent).toEqual(props.title);

    await component.$set({ disabled: true, type: "reset" });
    screen.debug();

    expect(button.hasAttribute("disabled")).toBeTruthy();
    expect(button.getAttribute("class")).toContain("disabled");
    expect(button.getAttribute("type")).toEqual("reset");

    const { getByTestId } = render(html`
      <${Button}>
        <h1 data-testid="slot">Test Data</h1>
      <//>
    `);
    screen.debug();

    // console.log(getByTestId("slot"));
    // console.log(expect(getByTestId("slot")).not);

    // expect(() => results.getByLabelText("another button")).not.toThrow();
  });
});
