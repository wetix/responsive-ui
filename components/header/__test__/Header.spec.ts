import { render } from "@testing-library/svelte";
import Header from "../src/Header.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Header", () => {
  const props = {
    class: "header-custom"
  };

  it("render test", () => {
    const { container } = render(Header, { props });
    const bottomSheet = container.querySelector("." + props.class) as HTMLElement;
    expect(() => bottomSheet).not.toThrow();
  });

  it("should render slots", () => {
    const { getByTestId } = render(SlotTest, {
      props: { component: Header, props }
    });
    // test slot render
    expect(() => getByTestId("slot")).not.toThrow();
  });
});
