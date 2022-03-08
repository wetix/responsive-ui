import { render } from "@testing-library/svelte";
import Icon from "../src/Icon.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Icon test", () => {
  const props = {
    id: "id",
    class: "icon-custom",
    fill: "#000",
    stroke: "#FFF",
    useHref: "#ticket",
    style: "background: transparent",
    sizeOf: "sm"
  };

  it("should render properly", () => {
    const result = render(Icon, { props });
    expect(() => result).not.toThrow();
  });

  it("should render slots properly", () => {
    const result = render(SlotTest, { props: { component: Icon, props }})
    expect(() => result).not.toThrow();
  })

  it("should have correct props", () => {
    const { container } = render(Icon, { props });
    const icon = container.querySelector(".resp-icon") as HTMLElement;

    //test class
    const classes = props.class.split(" ");
    for (let c of classes) {
      expect(icon.classList).toContain(c);
    }

    expect(icon.classList).toContain("resp-icon--sm");

    expect(icon.id).toEqual(props.id);
    expect(icon.getAttribute("style")).toEqual(props.style);

    const use = container.querySelector("use") as Element;
    expect(use.getAttribute("href")).toEqual(props.useHref);
  });
});