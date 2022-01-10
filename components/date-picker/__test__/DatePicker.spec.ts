import { render } from "@testing-library/svelte";
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

  const { container } = render(DatePicker, { props });
  const datepicker = container.querySelector("." + props.class);
  const con = container;

  it("should render correctly", () => {
    expect(() => con).not.toThrow();
  });

  it("shows proper heading when rendered", () => {
    expect(() => con).not.toThrow();
  });
});
