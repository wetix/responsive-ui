import { render } from "@testing-library/svelte";
import BottomBar from "../src/BottomBar.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("BottomBar", () => {
  const props = {
    title: "test title",
    class: "bottom-bar-custom"
  };

  it("render test", () => {
    const result = render(BottomBar, { props });
    expect(() => result).not.toThrow();
  });

  it("should render slots correctly", () => {
    const { getByTestId } = render(SlotTest, {
      props: { component: BottomBar, props }
    });

    expect(() => getByTestId("slot")).not.toThrow();
  });

  it("props test", () => {
    const { container } = render(BottomBar, { props });
    const bottombar = container.querySelector(".resp-bottom-bar") as HTMLElement;

    //test classes
    const classes = props.class.split(" ");
    for (let c of classes) {
      expect(bottombar.classList).toContain(c);
    }

    expect(bottombar.getAttribute("title")).toEqual(props.title);
  });
});
