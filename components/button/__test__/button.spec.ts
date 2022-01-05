import { render } from "@testing-library/svelte";
import Button from "../src/Button.svelte";

describe("Button", () => {
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
    expect(button.classList).not.toBe("");
    expect(button.classList).toContain("custom-class");
    expect(button.getAttribute("type")).toEqual("submit");
    expect(button.getAttribute("name")).toEqual(props.name);
    expect(button.getAttribute("style")).toEqual(props.style);
  });
});
