import type { SvelteComponentTyped } from "svelte/internal";

export interface InputProps {
  name?: string;
  type?: "text" | "number" | "reset";
  disabled?: boolean;
  style?: string;
}

export interface InputEvents {}

declare class Input extends SvelteComponentTyped<InputProps, InputEvents> {}

export default Input;
