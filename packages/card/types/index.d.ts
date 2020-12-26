import type { SvelteComponentTyped } from "svelte/internal";

export interface CardProps {
  title?: string;
  name?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  form?: string;
  style?: string;
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
