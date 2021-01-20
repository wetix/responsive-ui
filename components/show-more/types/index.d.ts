import type { SvelteComponentTyped } from "svelte/internal";

export interface ShowMoreProps {
  text?: string;
  threshold?: number;
  class?: string;
  style?: string;
}

export interface ShowMoreEvents {}

export interface ShowMoreSlots {
  default: {};
  trigger: {};
}

declare class ShowMore extends SvelteComponentTyped<
  ShowMoreProps,
  ShowMoreEvents,
  ShowMoreSlots
> {}

export default ShowMore;
