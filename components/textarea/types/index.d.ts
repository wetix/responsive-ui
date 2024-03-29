import type { SvelteComponentTyped } from "svelte/internal";

export interface TextareaProps {
  id?: string;
  title?: string;
  ref?: null | HTMLTextAreaElement;
  name?: string;
  /**
   * @default string
   */
  value?: string;
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
  focus?: WindowEventMap["focus"];
  blur?: WindowEventMap["blur"];
}

export interface TextareaSlots {
  default: Record<string, unknown>;
}

export declare class TextareaComponent extends SvelteComponentTyped<
  TextareaProps,
  TextareaEvents,
  TextareaSlots
> {}

export default TextareaComponent;
