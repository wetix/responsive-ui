import type { SvelteComponentTyped } from "svelte/internal";

export interface ShowMoreProps {
  id?: string;
  title?: string;
  threshold?: number;
  class?: string;
  style?: string;
}

export interface ShowMoreEvents {}

export interface ShowMoreSlots {
  default: {};
  trigger: {};
}

export declare class ShowMoreComponent extends SvelteComponentTyped<
  ShowMoreProps,
  ShowMoreEvents,
  ShowMoreSlots
> {}

export default ShowMoreComponent;
