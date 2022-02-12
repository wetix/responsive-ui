import { render, fireEvent } from "@testing-library/svelte";
import Chip from "../src/Chip.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Chip", () => {
  const props = {
    class: "custom-class",
    label: "Hello World!",
    checked: false,
    disabled: false,
    value: "Value",
    ref: document.createElement("checkbox") as HTMLInputElement
  };

  it("should render", () => {
    const result = render(Chip, { props });
    expect(() => result).not.toThrow();
  });

  it("should render slots properly", () => {
    const { getByTestId } = render(SlotTest, {
      props: { component: Chip, props }
    });

    expect(() => getByTestId("slot")).not.toThrow(); //test render
  });

  it("should render with correct props", () => {
    const { container } = render(Chip, { props });
    const chip = container.querySelector("input[type='checkbox']") as HTMLInputElement;

    //class test
    const label = container.querySelector("label") as HTMLElement;
    const classes = props.class.split(" ");
    for (let c of classes) {
      expect(label.classList).toContain(c);
    }
    expect(label.getAttribute("label")).toEqual(props.label); //label test
    expect(chip.checked).toBeFalsy(); //test checked
    expect(chip.disabled).toBeFalsy(); //test disabled
    expect(chip.value).toEqual(props.value); //test value
  });

  it("should be checked when onclick", async () => {
    const { container } = render(Chip, { props });
    const chip = container.querySelector("input[type='checkbox']") as HTMLInputElement;

    // chip should be false
    expect(chip.checked).toBeFalsy();

    await fireEvent.click(chip); //clicked should change

    // chip should be true
    expect(chip.checked).toBeTruthy();
  });
});
