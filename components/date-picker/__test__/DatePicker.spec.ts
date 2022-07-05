import { render } from "@testing-library/svelte";
import DatePicker from "../src/DatePicker.svelte";
import "@testing-library/jest-dom";

describe("DatePicker", () => {
  const props = {
    class: "datepicker-custom",
    open: false,
    placeholder: "Select date",
    name: "datejs",
    readonly: true,
    disabled: false,
    bordered: true,
    useNative: false,
    ref: document.createElement("input")
  };

  it("should render correctly", () => {
    const { container } = render(DatePicker, { props });
    expect(() => container).not.toThrow();
  });

  it("props test", () => {
    const { container } = render(DatePicker, { props });
    const div = container.querySelector(".resp-date-picker") as HTMLElement;
    const datepicker = container.querySelector("input[type='date']") as HTMLInputElement;

    //test classes
    const classes = props.class.split(" ");
    for (let c of classes) {
      expect(div.classList).toContain(c);
    }
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
      ...props,
      open: true,
      readonly: false,
    });

    //test open
    expect(container.querySelector(".resp-calendar")).toBeInTheDocument();
  });
});
