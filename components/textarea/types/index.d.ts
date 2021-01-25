import type { SvelteComponentTyped } from "svelte/internal";

export interface TextareaProps {
  ref?: null | HTMLTextAreaElement;
  name?: string;
  value?: any;
  form?: string;
  cols?: number;
  rows?: number;
  maxlength?: number;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  autosize?: boolean;
  wrap?: "hard" | "soft";
}

export interface TextareaEvents {
  input?(e?: Event): void;
  change?(e?: Event): void;
  blur?(e?: Event): void;
}

declare class Textarea extends SvelteComponentTyped<
  TextareaProps,
  TextareaEvents
> {}

export default Textarea;
