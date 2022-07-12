import { render } from "@testing-library/svelte";
import Column from "../src/Column.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Column", () => {
  const props = {
    id: "col",
    class: "col-custom",
    title: "col title",
    flex: "flex-grow",
    placeholder: "Select date",
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 24,
    sl: 24,
    style: "width: 100%;"
  };

  it("should render correctly", () => {
    const result = render(Column, { props });
    expect(() => result).not.toThrow();
  });

  it("should render slots correctly", () => {
    const { getByTestId } = render(SlotTest, { props: { component: Column, props } });
    expect(() => getByTestId("slot")).not.toThrow();
  });

  it("prop test", () => {
    const { container } = render(Column, { props });
    const column = container.getElementsByClassName("resp-col")[0] as HTMLElement;

    //test classes
    let classes = props.class.split(" ");

    //xs, sm, lg, md, xl, sl classes
    classes.push(
      "resp-col--xs-24",
      "resp-col--sm-24",
      "resp-col--md-24",
      "resp-col--lg-24",
      "resp-col--xl-24",
      "resp-col--sl-24"
    );
    for (let c of classes) {
      expect(column.classList).toContain(c);
    }

    expect(column.getAttribute("id")).toEqual(props.id); //test id
    expect(column.getAttribute("title")).toEqual(props.title); //test title
    expect(column.getAttribute("style")).toEqual(props.style); //test style
    //test placeholder
    expect(column.getAttribute("placeholder")).toEqual(props.placeholder);
  });
});
