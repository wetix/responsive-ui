import type { SvelteComponentTyped } from "svelte/internal";

export interface ChipProps {
  id?: string;
  ref?: HTMLInputElement;
  title?: string;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
  value: string;
  class?: string;
  style?: string;
}

export interface ChipEvents {
  /**
   * The onclick event occurs when the user clicks on an element.
   */
  click?: WindowEventMap["click"];
  /**
   * The onchange event occurs when the value of an element has been changed.
   */
  change?: WindowEventMap["change"];
}

export interface ChipSlots {
  default: {};
}

export declare class ChipComponent extends SvelteComponentTyped<
  ChipProps,
  ChipEvents,
  ChipSlots
> {}

export default ChipComponent;
