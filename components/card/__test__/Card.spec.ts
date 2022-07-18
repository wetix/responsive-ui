import { render } from "@testing-library/svelte";
import Card from "../src/Card.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Card", () => {
  const props = {
    id: "card",
    class: "custom-class",
    title: "test title",
    compact: true,
    style: "width: 100%;"
  };

  it("should render correctly", () => {
    const result = render(Card, { props });

    expect(() => result).not.toThrow();
  });

  it("should render slots correctly", () => {
    const { getByTestId } = render(SlotTest, {
      props: { component: Card, props }
    });
    expect(() => getByTestId("slot")).not.toThrow();
  });

  it("should have correct props", () => {
    const { container } = render(Card, { props });
    const card = container.getElementsByClassName("resp-card")[0] as HTMLElement;

    //test class
    const classes = props.class.split(" ");
    for (let c of classes) {
      expect(card.classList).toContain(c);
    }

    expect(card.getAttribute("id")).toEqual(props.id); //test id
    expect(card.getAttribute("title")).toEqual(props.title); //test title
    //test compact (class)
    expect(card.classList).toContain("resp-card--compact");
    //test style
    expect(card.getAttribute("style")).toEqual(props.style);
  });
});
