import type { SvelteComponentTyped } from "svelte/internal";

export interface ButtonProps {
  title: string;
  name: string;
  type: "button" | "submit" | "reset";
  disabled: boolean;
  form: string;
  onClick: (_: Event) => void;
  style: string;
}

export declare class Button extends SvelteComponentTyped<ButtonProps> {}
