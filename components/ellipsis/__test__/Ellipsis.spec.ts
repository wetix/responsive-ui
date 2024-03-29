import { render, fireEvent } from "@testing-library/svelte";
import Ellipsis from "../src/Ellipsis.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Ellipsis", () => {
  const props = {
    id: "id",
    title: "title",
    class: "ellipsis-custom",
    style: "width: 100%;"
  };

  it("should render", () => {
    const result = render(Ellipsis, { props });
    expect(() => result).not.toThrow();
  });

  it("should render slots", () => {
    const result = render(SlotTest, { props: { component: Ellipsis, props } });
    expect(() => result).not.toThrow();
  });

  it("should render with correct props", () => {
    const { container } = render(Ellipsis, { props });
    const ellipsis = container.getElementsByClassName("resp-ellipsis")[0] as HTMLElement;

    //test class
    const classes = props.class.split(" ");
    for (let c of classes) {
      expect(ellipsis.classList).toContain(c);
    }

    expect(ellipsis.id).toEqual(props.id); //test id
    expect(ellipsis.title).toEqual(props.title); //test title
    expect(ellipsis.getAttribute("style")).toEqual(props.style); //test style
  });

  it("click event", async () => {
    const { component, container } = render(Ellipsis, { props });

    const fn = jest.fn();
    component.$on("click", fn);
    await fireEvent.click(container.getElementsByClassName("resp-ellipsis")[0] as HTMLElement);

    expect(fn).toHaveBeenCalled();
  });
});
