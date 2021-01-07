import type { SvelteComponentTyped } from "svelte/internal";

export interface TextareaProps {
  name: string;
  value: any;
  rows?: number;
  placeholder?: string;
  autofocus?: boolean;
}

export interface TextareaEvents {
  input?: void;
}

declare class Textarea extends SvelteComponentTyped<
  TextareaProps,
  TextareaEvents
> {}

export default Textarea;
