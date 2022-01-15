import { render } from "@testing-library/svelte";
import Column from "../src/Column.svelte";

describe("Column", () => {
  const props = {
    name: "datejs",
    placeholder: "Select date"
  };

  const { getByPlaceholderText, component } = render(Column, { props });

  test("shows proper heading when rendered", () => {
    // const checkbox = document.querySelector('input[type="checkbox"]');
  });
});
