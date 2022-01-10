import { render, fireEvent, screen } from "@testing-library/svelte";
import Chip from "../src/Chip.svelte";
import SlotTest from "../../SlotTest/SlotTest.svelte";

describe("Chip", () => {
  const props = {
    class: "custom-class",
    label: "Hello World!",
    checked: false,
    disabled: true,
    value: "Value",
    ref: document.createElement('checkbox') as HTMLInputElement
  };

  const { container } = render(Chip, { props });

  const chip = container.querySelector("input[type='checkbox']");
  it("chip render", () => {
    expect(() => chip).not.toThrow();
  });

  it("slot render", () => {
    const {getByTestId} = render(SlotTest, {
      props: { Component: Chip, props }
    });

    expect(() => getByTestId("slot")).not.toThrow(); //test render
  });

  it("click event (checked)", () => {
    //chip should be false
    expect((chip as HTMLInputElement).checked).toBeFalsy();

    fireEvent.click(chip as HTMLInputElement); //clicked should change

    //chip should be true
    expect((chip as HTMLInputElement).checked).toBeTruthy();
  });
});