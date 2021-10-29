import type { SvelteComponentTyped } from "svelte/internal";

export interface SwitchProps {
  id?: string;
  name?: string;
  title?: string;
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
