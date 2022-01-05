import { render } from "@testing-library/svelte";
import Chip from "../src/Chip.svelte";

describe("Chip", () => {
  const props = {
    id: "card",
    class: "custom-class",
    name: "test-button",
    label: "Hello World!",
    style: "width: 100px;",
  };

  const result = render(Chip, { props });

  test("shows proper heading when rendered", () => {
    // const card = results.getByTitle("card");
    // expect(() => card).not.toThrow();
  });
});
