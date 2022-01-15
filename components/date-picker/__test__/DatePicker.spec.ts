import { render } from "@testing-library/svelte";
import DatePicker from "../src/DatePicker.svelte";

describe("DatePicker", () => {
  const props = {
    name: "datejs",
    placeholder: "Select date"
  };

  const { getByPlaceholderText, component } = render(DatePicker, { props });

  test("shows proper heading when rendered", () => {
    const input = getByPlaceholderText(props.placeholder);
    expect(() => input).not.toThrow();
    expect(input.tagName).toBe("INPUT");
    expect(input.nodeName).toBe("INPUT");
    expect(input.getAttribute("name")).toBe("datejs");
  });

  test("shows proper heading when rendered", () => {
    component.$set({ readonly: true });
  });
});
