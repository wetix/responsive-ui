import type { SvelteComponentTyped } from "svelte/internal";

export interface CardProps {
  compact?: boolean;
  class?: string;
}

export interface CardEvents {
  click?: void;
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
