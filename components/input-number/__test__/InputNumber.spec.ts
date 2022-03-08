import { render, fireEvent } from "@testing-library/svelte";
import InputNumber from "../src/InputNumber.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("InputNumber test", () => {
  const props = {
    id: "id",
    class: "input-number-custom",
    precision: 2
  };

  it("should render properly", () => {
    const result = render(InputNumber, { props });
    expect(() => result).not.toThrow();
  });

  it("should render with slots", () => {
    const result = render(SlotTest, { props: { component: InputNumber, props } });
    expect(() => result).not.toThrow();
  });

  it("should have correct props", () => {
    const { container } = render(InputNumber, { props });
    const inputNumber = container.querySelector(".resp-input-number") as HTMLElement;

    expect(inputNumber.id).toEqual(props.id);
    //test class
    let customClass = props.class.split(" ");
    for (let c of customClass) {
      expect(inputNumber.classList).toContain(c);
    }
  });

  it("should take in input", async () => {
    const { container } = render(InputNumber, { props });
    const inputNumber = container.querySelector("input") as HTMLInputElement;
    await fireEvent.change(inputNumber, { target: { value: 10 } });

    expect(inputNumber.value).toEqual("10");
  });
});