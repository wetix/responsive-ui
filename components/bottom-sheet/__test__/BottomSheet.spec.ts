import { render } from "@testing-library/svelte";
import BottomSheet from "../src/BottomSheet.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("BottomSheet", () => {
  const props = {
    class: "bottom-bar-custom"
  };

  it("render test", () => {
    const { container } = render(BottomSheet, { props });
    const bottomSheet = container.querySelector("." + props.class) as HTMLElement;
    expect(() => bottomSheet).not.toThrow();
  });

  it("should render slots", () => {
    const { getByTestId } = render(SlotTest, {
      props: { component: BottomSheet, props }
    });
    // test slot render
    expect(() => getByTestId("slot")).not.toThrow();
  });
});
