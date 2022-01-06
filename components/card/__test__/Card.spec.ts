import { render } from "@testing-library/svelte";
import Card from "../src/Card.svelte";

describe("Card", () => {
  const props = {
    id: "card",
    class: "custom-class",
    name: "test-button",
    label: "Hello World!",
    style: "width: 100px;",
  };

  const result = render(Card, { props });

  // test("shows proper heading when rendered", () => {
  //   // const card = results.getByTitle("card");
  //   // expect(() => card).not.toThrow();
  // });

  describe('card test', () => {
    const result = render(Card, { props });
    it('card prop test', () => {
      const card = result.container.getElementsByClassName("resp-card")[0];

      expect(() => card).not.toThrow();
      expect(card.classList).toContain(props.class);
      //how to get class:resp-card--compact ?
    });
  });
});
