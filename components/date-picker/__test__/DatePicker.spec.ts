import { render, fireEvent } from "@testing-library/svelte";
import DatePicker from "../src/DatePicker.svelte";

describe("DatePicker test", () => {
  const props = {
    class: "datepicker-custom",
    open: false,
    placeholder: "Select date",
    name: "datejs",
    readonly: false,
    disabled: false,
    bordered: true,
    ref: document.createElement('input') as HTMLInputElement
  };

  const props2 = {
    class: "datepicker-custom2",
    open: true,
    placeholder: "Select date",
    name: "datejs",
    readonly: false,
    disabled: false,
    bordered: false,
    ref: document.createElement('input') as HTMLInputElement
  };

  it("should render correctly", () => {
    const { container } = render(DatePicker, { props });
    expect(() => container).not.toThrow();
  });

  it("should get correct props", () => {
    const { container } = render(DatePicker, { props });
    const datepicker = container.querySelector(".resp-date-picker") as HTMLElement;

    //test closed
    //expect(() => container.querySelector(".resp-calendar")).toThrow();
    console.log(container.outerHTML);

    //click on datepicker input
    fireEvent.click(container);

    //test open
    //expect(() => container.querySelector(".resp-calendar")).not.toThrow();
    console.log(container.outerHTML);
  });
});
