import type { SvelteComponentTyped } from "svelte/internal";

export interface CheckboxProps {
  id?: string;
  ref?: HTMLInputElement;
  class?: string;
  name?: string;
  class?: string;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  style?: string;
}

export interface CheckboxEvents {
  change?: WindowEventMap["change"];
}

export interface CheckboxSlots {
  default: Record<string, unknown>;
}

export declare class CheckboxComponent extends SvelteComponentTyped<
  CheckboxProps,
  CheckboxEvents,
  CheckboxSlots
> {}

export default CheckboxComponent;
