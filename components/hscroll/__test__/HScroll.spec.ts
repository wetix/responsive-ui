import {render, fireEvent} from '@testing-library/svelte';
import HScroll from "../src/HScroll.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Horizontal Scroll", () => {
  //click event
  const props = {
    id: "id",
    title: "hscroll title",
    class: "hscroll-custom",
    scrollable: false,
    style: "background-color: white;"
  };

  it("render test", () => {
    const result = render(HScroll, { props });
    expect(() => result).not.toThrow();
  });

  it("slot test", () => {
    const result = render(SlotTest, { props: { component: HScroll, props } });
    expect(() => result).not.toThrow();
  });

  it("should have correct props", () => {
    const {container} = render(HScroll, { props });
    const hScroll = container.querySelector("." + props.class) as HTMLElement;

    expect(hScroll.id).toEqual(props.id); //id test
    expect(hScroll.title).toEqual(props.title); //title test
    expect(hScroll.getAttribute("style")).toEqual(props.style); //style test
  });

  it("click test", async () => {
    const {container} = render(HScroll, { props });
    const hScroll = container.querySelector(".resp-scroll") as HTMLElement;

    //buttons
    const prev = hScroll.querySelector(".resp-scroll__prev-icon > .resp-scroll__icon") as HTMLElement;
    const next = hScroll.querySelector(".resp-scroll__next-icon > .resp-scroll__icon") as HTMLElement;

    //mock fns
    const mockPrev = jest.fn(() => {
      console.log("prev");
    });
    const mockNext = jest.fn(() => {
      console.log("next");
    });

    //set onclick
    prev.onclick = mockPrev;
    next.onclick = mockNext;

    //click prev & expect
    await fireEvent.click(prev);
    expect(mockPrev).toHaveBeenCalled();
    //click next & expect
    await fireEvent.click(next);
    expect(mockNext).toHaveBeenCalled();
  });
});