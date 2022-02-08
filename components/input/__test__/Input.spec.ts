import { render, screen } from "@testing-library/svelte";
import Input from "../src/Input.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Input test", () => {
  const props = {
    ref: document.createElement("input"),
    class: "input-custom custom-2",
    id: "id",
    name: "name",
    label: "Hello World",
    autocomplete: "on",
    placeholder: "Enter text here",
    disabled: false,
    readonly: false,
    size: 100,
    maxlength: 200,
    style: "width: 100%;"
  };

  it("should render properly", () => {
    const result = render(Input, { props });
    expect(() => result).not.toThrow();
  });

  it("should render properly with slots", () => {
    const result = render(SlotTest, { props: { component: Input, props: { props } } });
    expect(() => result).not.toThrow();
  });

  it("should have correct props", () => {
    const { container } = render(Input, { props });
    const div = container.querySelector(".resp-input") as HTMLElement;

    //check classes
    //classes are done "class-1 class-2", and they are split by spaces
    let customClass = props.class.split(" ");
    for (let c of customClass) {
      expect(div.classList).toContain(c);
    }

    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.id).toEqual(props.id);
    expect(input.name).toEqual(props.name);
    expect(input.getAttribute("label")).toEqual(props.label);
    expect(input.placeholder).toEqual(props.placeholder);
    expect(input.disabled).toBeFalsy();
    expect(input.getAttribute("readonly")).toEqual("false");
    expect(input.size).toEqual(props.size);
    expect(input.maxLength).toEqual(props.maxlength);
    expect(input.getAttribute("style")).toEqual(props.style);
  });
});