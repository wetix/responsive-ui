import { render, fireEvent } from '@testing-library/svelte';
import Checkbox from '../src/Checkbox.svelte';
import SlotTest from '../../SlotTest/SlotTest.svelte';

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
    const {getByTestId} = render(SlotTest, {
      props: { Component: Checkbox, props }
    });
    expect(() => getByTestId("slot")).not.toThrow();
  });

  //onclick event
  it("should react to clicks corectly", () => {
    const {container} = render(Checkbox, { props });
    const chkbox = container.querySelector("input[type='checkbox']") as HTMLInputElement;

    //should be false
    expect(chkbox.checked).toBeFalsy();

    fireEvent.click(chkbox);
    //should be checked
    expect(chkbox.checked).toBeTruthy();
  });
});