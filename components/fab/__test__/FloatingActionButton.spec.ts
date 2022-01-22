import { render, fireEvent } from "@testing-library/svelte";
import FloatingActionButton from "../src/FloatingActionButton.svelte";

describe("FAB", () => {
  const props = {
    id: "id",
    title: "test title",
    class: "bottom-bar-custom",
    label: "test label",
    style: "background-color: white;"
  };

  it("render test", () => {
    const result = render(FloatingActionButton, { props });
    expect(() => result).not.toThrow();
  });

  it("props test", () => {
    const {container} = render(FloatingActionButton, { props });
    const fab = container.querySelector("." + props.class) as HTMLElement;

    expect(fab.id).toEqual(props.id); //test id
    expect(fab.title).toEqual(props.title); //test title
    expect(fab.getAttribute("label")).toEqual(props.label); //test label
    expect(fab.getAttribute("style")).toEqual(props.style); //test style
  });

  it("test click event", async () => {
    const {container, component} = render(FloatingActionButton, { props });
    const fab = container.querySelector("." + props.class) as HTMLElement;

    const mock = jest.fn(); //test function
    component.$on('click', mock); //set function onclick

    //click
    await fireEvent.click(fab);

    //expect function
    expect(mock).toHaveBeenCalled();
  });
});
