import { render } from "@testing-library/svelte";
import Card from "../src/Card.svelte";

describe("Card", () => {
  const props = {
    id: "card",
    class: "custom-class",
    name: "test-button",
    label: "Hello World!",
    style: "width: 100px;"
  };

  const result = render(Card, { props });

  test("shows proper heading when rendered", () => {
    // const card = results.getByTitle("card");
    // expect(() => card).not.toThrow();
  });
});
