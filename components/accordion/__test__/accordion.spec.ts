import { render, fireEvent, screen } from '@testing-library/svelte';
import Accordion from '../src/Accordion.svelte';
import SlotTest from "../../SlotTest/SlotTest.svelte";

describe("Accordion", () => {
  const props = {
    class: "custom-accordion",
    caption: "test caption",
    disabled: false,
    collapsed: false,
    label: "test label"
  };

  it("accordion should render", () => {
    const {container} = render(Accordion, { props });
    expect(() => container).not.toThrow(); //test rendering
  });

  it("slots should correctly render", () => {
    const { getByTestId } = render(SlotTest, {
      props: { Component: Accordion }
    });

    expect(() => getByTestId("slot")).not.toThrow(); //test rendering
  });

  //test props
  it("props test", () => {
    const result = render(Accordion, { props });
    const container = result.container;
    const div = container.querySelector("." + props.class); //custom class

    //label test
    expect((div as HTMLElement)
    .getAttribute("label")).toEqual(props.label);

    //caption test
    const label = container.querySelector("label");
    expect((label as HTMLElement).textContent).toEqual(props.caption);
  });

  //test click event
  it("test click event", () => {
    const {container} = render(Accordion, { props });
    const accordion =
      container.querySelector("input[type='checkbox']");

    //expect to not be collapsed (true)
    expect((accordion as HTMLInputElement).checked).toBeTruthy();

    //click
    fireEvent.click(accordion as HTMLInputElement);

    //expect to be collapsed (false)
    expect((accordion as HTMLInputElement).checked).toBeFalsy();
  });
});