import { render } from "@testing-library/svelte";
import Column from "../src/Column.svelte";
import SlotTest from "../../SlotTest/SlotTest.svelte";

describe("Column", () => {
  const props = {
    id: "col",
    class: "col-custom",
    title: "col title",
    placeholder: "Select date",
    md: 2,
    style: "width: 100%;"
  };

  it("should render correctly", () => {
    const result = render(Column, { props });
    expect(() => result).not.toThrow();
  });

  it("should render props correctly", () => {
    const result = render(SlotTest, {Component: Column});
    expect(() => result).not.toThrow();
  });

  it("prop test", () => {
    const {container} = render(Column, { props });
    const column = container.querySelector("." + props.class) as HTMLElement;

    expect(column.getAttribute("id")).toEqual(props.id); //test id
    expect(column.getAttribute("title")).toEqual(props.title); //test title
    expect(column.classList).toContain("resp-col--md-2"); //test md
    expect(column.getAttribute("style")).toEqual(props.style); //test style
    //test placeholder
    expect(column.getAttribute("placeholder")).toEqual(props.placeholder);
  });
});
