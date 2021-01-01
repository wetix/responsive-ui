import type { SvelteComponentTyped } from "svelte/internal";

export interface TextareaProps {
  name: string;
  placeholder: string;
  rows: number;
  value: any;
  autofocus: boolean;
}

export interface TextareaEvents {
  input?: void;
}

declare class Textarea extends SvelteComponentTyped<
  TextareaProps,
  TextareaEvents
> {}

export default Textarea;
