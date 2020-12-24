import type { SvelteComponentTyped } from "svelte/internal";

export interface TextareaProps {
  name: string;
  placeholder: string;
  rows: number;
  value: any;
  autofocus: boolean;
}

export interface TextareaEvents {}

declare class Textarea extends SvelteComponentTyped<
  TextareaProps,
  TextareaEvents
> {}

export default Textarea;
