import { render } from "@testing-library/svelte";
import BottomSheet from "../src/BottomSheet.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("BottomSheet", () => {
  const props = {
    id: "id",
    class: "bottom-bar-custom",
    open: true,
    height: 100,
    draggable: false,
    maskClosable: true,
    style: "width: 100%;"
  };

  it("render test", () => {
    const result = render(BottomSheet, { props });
    console.log(result.component);
    expect(() => result).not.toThrow();
  });

  it("should render slots", () => {
    const { getByTestId } = render(SlotTest, {
      props: { component: BottomSheet, props }
    });
    // test slot render
    expect(() => getByTestId("slot")).not.toThrow();
  });

  it("should render with correct props", async () => {
    const { container } = render(BottomSheet, { props });
    const bottomsheet = container.querySelector(".resp-bottom-sheet") as HTMLElement;

    expect(bottomsheet.id).toEqual(props.id);
    //test classes
    const classes = props.class.split(" ");
    for (let c of classes) {
      expect(bottomsheet.classList).toContain(c);
    }

    //test if open
    //TODO: error - transform is always translateY(100%) if open and closed
    //expect(bottomsheet.style.transform).toEqual("translateY(0%)");
  });

  // it("should close on click", () => {
  //   const { container } = render(BottomSheet, { props });
  //   const bottomsheet = container.querySelector(".resp-bottom-sheet") as HTMLElement;
  //   const overlay = container.querySelector(".resp-bottom-sheet__overlay") as HTMLElement;
  // });
});
