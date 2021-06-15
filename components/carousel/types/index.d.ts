import type { SvelteComponentTyped } from "svelte/internal";

export type CarouselItem = {
  src:string;
  url:string;
};

export interface CarouselProps {
  class?: string;
  compact?: boolean;
}

export interface CarouselEvents {
  click?: WindowEventMap["click"];
}

export interface CarouselSlots {
  default: {};
}

declare class Carousel extends SvelteComponentTyped<
  CarouselProps,
  CarouselEvents,
  CarouselSlots
> {}

export default Carousel;
