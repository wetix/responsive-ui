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
  autoResize?: boolean;
}

export interface TextareaEvents {
  input?: any;
  change?: any;
  blur?: any;
}

declare class Textarea extends SvelteComponentTyped<
  TextareaProps,
  TextareaEvents
> {}

export default Textarea;
