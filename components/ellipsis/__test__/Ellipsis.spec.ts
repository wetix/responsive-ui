import { render, fireEvent } from "@testing-library/svelte";
import Ellipsis from "../src/Ellipsis.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Ellipsis", () => {
  const props = {
    id: "id",
    title: "title",
    class: "ellipsis-custom",
    style: "width: 100%;"
  };

  it("should render", () => {
    const result = render(Ellipsis, { props });
    expect(() => result).not.toThrow();
  });

  it("should render slots", () => {
    const result = render(SlotTest, { props: { component: Ellipsis, props } });
    expect(() => result).not.toThrow();
  });

  it("click event", async () => {
    const { component, container } = render(Ellipsis, { props });

    const fn = jest.fn();
    component.$on("click", fn);
    await fireEvent.click(container.querySelector("#id") as HTMLElement);

    expect(fn).toHaveBeenCalled();
  });
});
