import { render } from "@testing-library/svelte";
import Badge from "../src/Badge.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Badge", () => {
  const props = {
    title: "badge",
    class: "badge-custom",
    count: 100,
    max: 99
  };

  it("should render", () => {
    const result = render(Badge, { props });
    //test render
    expect(() => result).not.toThrow();
  });

  it("should render slots", () => {
    const { getByTestId } = render(SlotTest, {
      props: { component: Badge, props }
    });
    //test slot render
    expect(() => getByTestId("slot")).not.toThrow();
  });

  it("test props", () => {
    const { rerender, container } = render(Badge, { props });
    let badge = container.querySelector("." + props.class) as HTMLElement;

    //previously count is more than max
    expect(badge.getAttribute("data-count")).toEqual(props.max + "+");

    //rerender
    const props2 = {
      title: "badge",
      class: "badge-custom",
      count: 90,
      max: 99
    };
    rerender(props2); //change count to less than max

    badge = container.querySelector("." + props2.class) as HTMLElement;

    //display should show count now
    expect(parseInt(badge.getAttribute("data-count") as string)).toEqual(props2.count);
  });
});
