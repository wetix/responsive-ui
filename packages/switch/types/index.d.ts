import type { SvelteComponentTyped } from "svelte/internal";

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
}

export interface SwitchEvents {}

declare class Switch extends SvelteComponentTyped<SwitchProps, SwitchEvents> {}

export default Switch;
