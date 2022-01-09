import { render, fireEvent } from "@testing-library/svelte";
import Button from "../src/Button.svelte";

describe("Button", () => {
  const props = {
    class: "custom-class",
    name: "test-button",
    label: "Hello World!",
    style: "width: 100px;",
  };

  test("shows proper heading when rendered", () => {
    const results = render(Button, { props });
    const button = results.getByRole("button");

    expect(() => button).not.toThrow();
    expect(button.classList).not.toBe("");
    expect(button.classList).toContain("custom-class");
    expect(button.getAttribute("type")).toEqual("submit");
    expect(button.getAttribute("name")).toEqual(props.name);
    expect(button.getAttribute("style")).toEqual(props.style);
  });

  it("test on click event", () => {
    const {component, getByRole} = render(Button, { props });
    //mock function
    const mock = jest.fn();
    const button = getByRole("button");
    //set event
    component.$on('click', mock);

    //click button
    fireEvent.click(button);
    //test function
    expect(mock).toHaveBeenCalled();
  });
});
