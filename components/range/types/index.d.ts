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

export declare class RangeComponent extends SvelteComponentTyped<
  RangeProps,
  RangeEvents,
  RangeSlots
> {}

export default RangeComponent;
