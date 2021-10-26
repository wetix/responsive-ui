import type { SvelteComponentTyped } from "svelte/internal";

export interface TextareaProps {
  id?: string;
  title?: string;
  ref?: null | HTMLTextAreaElement;
  name?: string;
  value?: any;
  form?: string;
  cols?: number;
  rows?: number;
  class?: string;
  bordered?: boolean;
  maxlength?: number;
  disabled?: boolean;
  readonly?: boolean;
  style?: string;
  placeholder?: string;
  autoResize?: boolean;
}

export interface TextareaEvents {
  input?: WindowEventMap["input"];
  change?: WindowEventMap["change"];
  blur?: WindowEventMap["blur"];
}

export interface TextareaSlots {}

declare class Textarea extends SvelteComponentTyped<
  TextareaProps,
  TextareaEvents,
  TextareaSlots
> {}

export default Textarea;
