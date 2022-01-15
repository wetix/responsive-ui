import { render } from "@testing-library/svelte";
import AppBar from "../src/AppBar.svelte";

describe("AppBar", () => {
  const props = {
    class: "appbar-class"
  };
  const { container } = render(AppBar, { props });

  it("render test", () => {
    const appBar = container.querySelector(`.${props.class}`) as HTMLElement;
    expect(() => appBar).not.toThrow();
  });
});
