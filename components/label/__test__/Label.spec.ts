import { render } from '@testing-library/svelte';
import Label from "../src/Label.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Label test", () => {
  const props = {
    id: "id",
    class: "label-custom",
    label: "Hello world!"
  };

  it("should render properly", () => {
    const result = render(Label, { props });
    expect(() => result).not.toThrow();
  });

  it("should render with slots", () => {
    const result = render(SlotTest, { props: { component: Label, props } });
    expect(() => result).not.toThrow();
  });

  it("should have correct props", () => {
    const { container } = render(Label, { props });
    const label = container.getElementsByTagName("label")[0] as HTMLElement;

    expect(label.id).toEqual(props.id);

    //test class
    let customClass = props.class.split(" ");
    for (let c of customClass) {
      expect(label.classList).toContain(c);
    }

    expect(label.textContent).toEqual(props.label);
  });
});