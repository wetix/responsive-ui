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

declare class Switch extends SvelteComponentTyped<SwitchProps, SwitchEvents> {}

export default Switch;
