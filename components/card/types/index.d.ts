import type { SvelteComponentTyped } from "svelte/internal";

export interface CardProps {
  class?: string;
  compact?: boolean;
}

export interface CardEvents {
  click?: any;
}

export interface CardSlots {
  default: {};
}

declare class Card extends SvelteComponentTyped<
  CardProps,
  CardEvents,
  CardSlots
> {}

export default Card;
