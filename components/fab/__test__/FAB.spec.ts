import { render } from "@testing-library/svelte";
import FAB from "../src/FloatingActionButton.svelte";

describe("FAB", () => {
  const props = {
    title: "test title",
    class: "bottom-bar-custom"
  };

  it("render test", () => {
    const { container } = render(FAB, { props });
    const bottombar = container.querySelector("." + props.class) as HTMLElement;
    expect(() => bottombar).not.toThrow();
  });
});
