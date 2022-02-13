import { render } from "@testing-library/svelte";
import Header from "../src/Header.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Header", () => {
  const props = {
    id: "id",
    label: "Hello World",
    title: "Title",
    class: "header-custom",
    style: "width: 100%;"
  };

  it("render test", () => {
    const result = render(Header, { props });
    expect(() => result).not.toThrow();
  });

  it("should render slots", () => {
    const { getByTestId } = render(SlotTest, {
      props: { component: Header, props }
    });
    // test slot render
    expect(() => getByTestId("slot")).not.toThrow();
  });

  it("should render with correct props", () => {
    const { container } = render(Header, { props });
    const header = container.querySelector("." + props.class) as HTMLElement;

    //test class
    const classes = props.class.split(" ");
    for (let c of classes) {
      expect(header.classList).toContain(c);
    }

    expect(header.id).toEqual(props.id); //id test
    expect(header.title).toEqual(props.title); //title test

    //test label
    const label = container.querySelector(".resp-header__label") as HTMLElement;
    expect(label.innerHTML).toEqual(props.label);

    //test style
    expect(header.getAttribute("style")).toEqual(props.style);
  });
});
