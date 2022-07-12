import { render, fireEvent } from "@testing-library/svelte";
import HScroll from "../src/HScroll.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("HScroll", () => {
  //click event
  const props = {
    id: "id",
    title: "hscroll title",
    class: "hscroll-custom",
    scrollable: true,
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
    const { container } = render(HScroll, { props });
    const hScroll = container.getElementsByClassName("resp-scroll")[0] as HTMLElement;

    //test class
    const classes = props.class.split(" ");
    for (let c of classes) {
      expect(hScroll.classList).toContain(c);
    }

    expect(hScroll.id).toEqual(props.id); //id test
    expect(hScroll.title).toEqual(props.title); //title test
    expect(hScroll.getAttribute("style")).toEqual(props.style); //style test

    //scrollable test
    const scrollBox = container.getElementsByClassName("resp-scroll__box")[0] as HTMLElement;
    expect(scrollBox.classList).toContain("resp-scroll__box--scrollable");
  });

  it("click test", async () => {
    const { getByTestId } = render(HScroll, { props });

    //buttons
    const prev = getByTestId("prev") as HTMLElement;
    const next = getByTestId("next") as HTMLElement;

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
