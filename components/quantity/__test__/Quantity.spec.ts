import { render, fireEvent } from '@testing-library/svelte';
import Quantity from "../src/Quantity.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Quantity test", () => {
  const props = {
    id: "id",
    class: "qty-custom",
    min: 0,
    max: 10,
    step: 1,
    style: "width: 100%;"
  };

  it("should render properly", () => {
    const result = render(Quantity, { props });
    expect(() => result).not.toThrow();
  });

  it("should render with slots", () => {
    const result = render(SlotTest, { props: { Quantity: Quantity, props } });
    expect(() => result).not.toThrow();
  });

  it("should have correct props", () => {
    const { container } = render(Quantity, { props });
    const quantity = container.querySelector(".resp-quantity") as HTMLElement;

    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.id).toEqual(props.id);

    //test class
    let customClass = props.class.split(" ");
    for (let c of customClass) {
      expect(quantity.classList).toContain(c);
    }

    //test style
    expect(quantity.getAttribute("style")).toEqual(props.style);
  });

  it("fireEvent", async () => {
    const { container } = render(Quantity, { props });
    const input = container.querySelector("input") as HTMLInputElement;

    const adjust = container.querySelectorAll(".resp-quantity__control");

    //test min
    await fireEvent.click(adjust[0]);
    expect(parseInt(input.value)).toEqual(0);

    //test max
    for (let i = 0; i < 11; i++) {
      await fireEvent.click(adjust[1]);
    }

    expect(parseInt(input.value)).toEqual(10);
  });
});