import { render } from "@testing-library/svelte";
import Column from "../src/Column.svelte";
import SlotTest from "../../SlotTest/SlotTest.svelte";

describe("Column", () => {
  const props = {
    id: "col",
    class: "col-custom",
    title: "col title",
    flex: "flex-grow",
    placeholder: "Select date",
    xs: 0,
    sm: 0,
    md: 2,
    lg: 0,
    xl: 0,
    sl: 0,
    style: "width: 100%;"
  };

  it("should render correctly", () => {
    const result = render(Column, { props });
    expect(() => result).not.toThrow();
  });

  it("should render slots correctly", () => {
    const result = render(SlotTest, {props : {Component: Column, props}});
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
