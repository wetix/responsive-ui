import type { SvelteComponentTyped } from "svelte/internal";

export interface SwitchProps {
  id?: string;
  ref?: HTMLInputElement;
  name?: string;
  class?: string;
  checked?: boolean;
  disabled?: boolean;
  style?: string;
}

export interface SwitchEvents {
  change?: WindowEventMap["change"];
}

export interface SwitchSlots {}

export declare class SwitchComponent extends SvelteComponentTyped<
  SwitchProps,
  SwitchEvents,
  SwitchSlots
> {}

export default SwitchComponent;
