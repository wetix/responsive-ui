import type { SvelteComponentTyped } from "svelte/internal";

export interface LabelProps {
  title: string;
  style?: string;
}

export interface LabelEvents {}

export interface LabelSlots {
  default: {};
}

declare class Label extends SvelteComponentTyped<
  LabelProps,
  LabelEvents,
  LabelSlots
> {}

export default Label;
