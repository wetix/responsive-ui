import type { SvelteComponentTyped } from "svelte/internal";

export interface LabelProps {
  id?: string;
  title?: string;
  label: string;
  for?: string;
  form?: string;
  class?: string;
  style?: string;
}

export interface LabelSlots {
  default: Record<string, unknown>;
}

export declare class LabelComponent extends SvelteComponentTyped<
  LabelProps,
  Record<string, unknown>,
  LabelSlots
> {}

export default LabelComponent;
