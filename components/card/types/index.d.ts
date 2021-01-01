import type { SvelteComponentTyped } from "svelte/internal";

export interface CardProps {}

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
