import { render, fireEvent, screen } from '@testing-library/svelte';
import Accordion from '../src/Accordion.svelte';
import SlotTest from '../src/SlotTest.svelte';

describe("Accordion", () => {
  const props = {
    class: "custom-accordion",
    caption: "test caption",
    disabled: false,
    collapsed: false,
    label: "test label"
  };

  it("accordion should render", () => {
    const result = render(Accordion, { props });
    expect(() => result).not.toThrow(); //test rendering
  });

  it("slots should correctly render", () => {
    const { getByTestId } = render(SlotTest, {
      props: { Component: Accordion }
    });

    expect(() => getByTestId("slot")).not.toThrow(); //test rendering
  });

  //test props
  // it("test props", () => {
  //   const results = render(Accordion, { props });
  //   const accordion = results.container.getElementsByClassName("resp-accordion")[0];

  //   expect(accordion.classList).toContain(props.class);

  //   const content = accordion.getElementsByClassName("resp-accordion__content-box")[0];
  //   const slot = content.firstElementChild;
  //   expect(() => slot).not.toThrow();
  // });

  //test onclick event
  // it("onclick should make content visible/invisible", () => {
  //   const results = render(Accordion, { props });
  //   const accordion = results.container.getElementsByClassName("resp-accordion")[0];

  //   const input = accordion.getElementsByTagName("input")[0];

  //   fireEvent.click(input); //should make content not visible
  //   //expect text to be not visible
  //   expect(() => screen.getByText(props.label)).not.toThrow();
  // });
});