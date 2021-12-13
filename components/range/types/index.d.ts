import type { SvelteComponentTyped } from "svelte/internal";

export interface RangeProps {
  id?: string;
  class?: string;
  style?: string;
}

export interface RangeEvents {
  click?: any;
}

export interface RangeSlots {}

declare class Range extends SvelteComponentTyped<
  RangeProps,
  RangeEvents,
  RangeSlots
> {}

export default Range;
