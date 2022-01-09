import { render } from "@testing-library/svelte";
import Column from "../src/Column.svelte";
import SlotTest from "../../SlotTest/SlotTest.svelte";

describe("Column", () => {
  const props = {
    id: "col",
    title: "col title",
    placeholder: "Select date"
  };

  it("should render correctly", () => {
    const { component } = render(Column, { props });
  });
});
