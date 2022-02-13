import { render, fireEvent } from "@testing-library/svelte";
import Accordion from "../src/Accordion.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Accordion", () => {
  const props = {
    class: "custom-accordion",
    caption: "test caption",
    disabled: false,
    collapsed: false,
    label: "test label"
  };

  it("accordion should render", () => {
    const { container } = render(Accordion, { props });
    expect(() => container).not.toThrow(); //test rendering
  });

  it("slots should correctly render", () => {
    const { getByTestId } = render(SlotTest, {
      props: { component: Accordion, props }
    });

    expect(() => getByTestId("slot")).not.toThrow(); //test rendering
  });

  //test props
  it("props test", () => {
    const { container } = render(Accordion, { props });
    const div = container.querySelector(".resp-accordion") as HTMLElement;

    //test classes
    const classes = props.class.split(" ");
    for (let c of classes) {
      expect(div.classList).toContain(c);
    }
    expect(div.getAttribute("label")).toEqual(props.label); //label test

    //caption test
    const label = container.querySelector("label") as HTMLElement;
    expect(label.textContent).toEqual(props.caption);
  });

  //test click event
  it("test click event", async () => {
    const { container } = render(Accordion, { props });
    const accordion = container.querySelector(
      "input[type='checkbox']"
    ) as HTMLInputElement;

    //expect to not be collapsed (true)
    expect(accordion.checked).toBeTruthy();

    //click
    await fireEvent.click(accordion);

    //expect to be collapsed (false)
    expect(accordion.checked).toBeFalsy();
  });
});
