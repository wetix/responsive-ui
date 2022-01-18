import {render, fireEvent} from "@testing-library/svelte";
import Dropdown from "../src/Dropdown.svelte";
import SlotTest from "../../../test/slot/SlotTest.svelte";

describe("Dropdown", () => {
  //dropdown items
  const items = [
    {
      label: "label 1",
      disabled: false,
      divider: false
    },
    {
      label: "label 2",
      disabled: false,
      divider: false
    },
    {
      label: "label 3",
      disabled: false,
      divider: false
    }
  ];

  //click dropdown
  const propsClick = {
    id: "id",
    class: "dropdown-click-custom",
    disabled: false,
    items: items,
    value: ["1", "2", "3"],
    dropdownTriggerMode: "click"
  };

  //hover dropdown
  const propsHover = {
    id: "id",
    class: "dropdown-click-custom",
    disabled: false,
    items: items,
    value: ["1", "2", "3"],
    dropdownTriggerMode: "hover"
  };

  //context dropdown
  const propsContext = {
    id: "id",
    class: "dropdown-click-custom",
    disabled: false,
    items: items,
    value: ["1", "2", "3"],
    dropdownTriggerMode: "contextmenu"
  };

  describe("click dropdown", () => {
    it("should render with click", () => {
      const result = render(Dropdown, {propsClick});
      expect(() => result).not.toThrow();
    });

    it("slot test", () => {
      const result = render(SlotTest, {props: {component: Dropdown, props: propsClick}});
      expect(() => result).not.toThrow();
    });

    // it("should have correct props", () => {
    //   const {container} = render(Dropdown, {propsClick});
    //   const dropdown = container.querySelector(".responsive-ui-dropdown") as HTMLElement;
    // });

    // it("should perform correct action", () => {

    // });

  });

  describe("hover dropdown", () => {
    it("should render with hover", () => {
      const result = render(Dropdown, {propsHover});
      expect(() => result).not.toThrow();
    });

    it("slot test", () => {
      const result = render(SlotTest, {props: {component: Dropdown, props: propsHover}});
      expect(() => result).not.toThrow();
    });

  });

  describe("hover context", () => {
    it("should render with context", () => {
      const result = render(Dropdown, {propsContext});
      expect(() => result).not.toThrow();
    });

    it("slot test", () => {
      const result = render(SlotTest, {props: {component: Dropdown, props: propsContext}});
      expect(() => result).not.toThrow();
    });

  });
})