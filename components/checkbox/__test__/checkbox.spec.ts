import { render, screen, fireEvent } from '@testing-library/svelte';
import Checkbox from '../src/Checkbox.svelte';
import SlotTest from '../src/SlotTest.svelte';

describe("Checkbox", () => {
  const props = {
    class: "checkbox-custom",
    name: "Test",
    disabled: false,
    value: "Test Value",
    checked: true
  };

  //render checkbox
  it("checkbox render test", () => {
    const result = render(Checkbox, { props });

    expect(() => result).not.toThrow();
  });

  //render slots
  it("checkbox slot render test", () => {
    const result = render(SlotTest, { Component: Checkbox });
    expect(() => result).not.toThrow();
  });

  //onclick event
  // it("check test", () => {
  //   const {container, component} = render(Checkbox, { props });
  //   const chkbox = container.getElementsByClassName("resp-checkbox")[0];

  //   fireEvent.click(chkbox);
  // });
});