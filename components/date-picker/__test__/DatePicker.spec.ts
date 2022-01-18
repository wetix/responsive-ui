import { render } from "@testing-library/svelte";
import DatePicker from "../src/DatePicker.svelte";
import "@testing-library/jest-dom";

describe("DatePicker test", () => {
  const props = {
    class: "datepicker-custom",
    open: false,
    placeholder: "Select date",
    name: "datejs",
    readonly: true,
    disabled: false,
    bordered: true,
    ref: document.createElement("input") as HTMLInputElement
  };

  it("should render correctly", () => {
    const { container } = render(DatePicker, { props });
    expect(() => container).not.toThrow();
  });

  it("props test", () => {
    const { container } = render(DatePicker, { props });
    const div = container.querySelector("." + props.class) as HTMLElement;
    const datepicker = container.querySelector("input[type='date']") as HTMLInputElement;

    //test placeholder
    expect(datepicker.getAttribute("placeholder")).toEqual(props.placeholder);
    //test name
    expect(datepicker.getAttribute("name")).toEqual(props.name);
    //test disabled
    expect(datepicker.disabled).toBeFalsy();
    //test bordered
    expect(div.classList).toContain("resp-date-picker--bordered");
  });

  it("should open and close correctly", () => {
    const { container, rerender } = render(DatePicker, { props });

    //test closed
    expect(container.querySelector(".resp-calendar")).not.toBeInTheDocument();

    //rerender opened
    rerender({
      class: "datepicker-custom",
      open: true,
      placeholder: "Select date",
      name: "datejs",
      readonly: false,
      disabled: false,
      bordered: true,
      ref: document.createElement("input") as HTMLInputElement
    });

    //test open
    expect(container.querySelector(".resp-calendar")).toBeInTheDocument();
  });
});
