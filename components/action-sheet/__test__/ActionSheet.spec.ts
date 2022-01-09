import { render, screen, fireEvent } from '@testing-library/svelte';
import ActionSheet from '../src/ActionSheet.svelte';

describe("Action Sheet test", () => {
  const item1 = {
    key: "string",
    label: "string",
    options: {
      label: "lab",
      value: "val",
      disabled: false,
      selected: false
    }
  };
  const props = {
    class: "action-sheet-custom",
    caption: "action test",
    items: [item1],
    open: true,
    disabled: false,
    maskClosable: true,
    closable: true
  };

  it("render test", () => {
    const result = render(ActionSheet, { props });
    console.log(result.container.outerHTML);
    expect(() => result).not.toThrow();
  });
});