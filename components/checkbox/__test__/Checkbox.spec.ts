import { render, fireEvent } from "@testing-library/svelte";
import Checkbox from "../src/Checkbox.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Checkbox", () => {
  const props = {
    class: "checkbox-custom",
    name: "Test",
    disabled: false,
    value: "Test Value",
    checked: false,
    ref: document.createElement("checkbox") as HTMLInputElement
  };

  //render checkbox
  it("checkbox render test", () => {
    const result = render(Checkbox, { props });
    expect(() => result).not.toThrow();
  });

  //render slots
  it("checkbox slot render test", () => {
    const { getByTestId } = render(SlotTest, {
      props: { component: Checkbox, props }
    });
    expect(() => getByTestId("slot")).not.toThrow();
  });

  //props test
  it("should have correct props", () => {
    const { container } = render(Checkbox, { props });
    const checkBox = container.querySelector(
      "input[type='checkbox']"
    ) as HTMLInputElement;

    //test classes
    const label = container.querySelector("label") as HTMLElement;
    const classes = props.class.split(" ");
    for (let c of classes) {
      expect(label.classList).toContain(c);
    }

    expect(checkBox.name).toEqual(props.name); //test name
    expect(checkBox.disabled).toBeFalsy(); //test disabled
    expect(checkBox.value).toEqual(props.value); //test value
    expect(checkBox.checked).toBeFalsy(); //test checked
  });

  //onclick event
  it("should react to clicks corectly", async () => {
    const { container } = render(Checkbox, { props });
    const checkBox = container.querySelector(
      "input[type='checkbox']"
    ) as HTMLInputElement;

    //should be false
    expect(checkBox.checked).toBeFalsy();

    await fireEvent.click(checkBox);
    //should be checked
    expect(checkBox.checked).toBeTruthy();
  });
});
