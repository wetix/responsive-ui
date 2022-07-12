import { render, fireEvent } from '@testing-library/svelte';
import Menu from "../src/Menu.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Menu test", () => {
  const props = {
    class: "menu-custom",
    open: true,
    options: [
      {
        key: "1",
        label: "Select 1",
        href: "#"
      },
      {
        key: "2",
        label: "Select 2",
        href: "#"
      },
      {
        key: "3",
        label: "Select 3",
        href: "#"
      },
    ],
  };

  it("should render properly", () => {
    const result = render(Menu, { props });
    expect(() => result).not.toThrow();
  });

  it("should render with slots", () => {
    const result = render(SlotTest, { props: { Menu: Menu, props } });
    expect(() => result).not.toThrow();
  });

  it("should have correct props", () => {
    const { container } = render(Menu, { props });
    const menu = container.getElementsByClassName("resp-menu")[0] as HTMLElement;

    //test class
    let customClass = props.class.split(" ");
    for (let c of customClass) {
      expect(menu.classList).toContain(c);
    }

    //test options
    const allOptions = menu.querySelectorAll("li.resp-menu__item");
    allOptions.forEach((item, i) => {
      expect(JSON.parse((item as HTMLElement).dataset.option as string)).toEqual(props.options[i]);
    });
  });
});