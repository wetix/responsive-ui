import type { SvelteComponentTyped } from "svelte/internal";

export interface DateProps {}

export interface DateEvents {}

export interface DateSlots {
  default: {};
}

declare class Date extends SvelteComponentTyped<
  DateProps,
  DateEvents,
  DateSlots
> {}

export default Date;
