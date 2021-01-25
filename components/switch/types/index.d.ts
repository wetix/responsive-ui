import type { SvelteComponentTyped } from "svelte/internal";

export interface SwitchProps {
  class?: string;
  checked?: boolean;
  disabled?: boolean;
}

export interface SwitchEvents {
  change?(e?: Event): void;
}

declare class Switch extends SvelteComponentTyped<SwitchProps, SwitchEvents> {}

export default Switch;
