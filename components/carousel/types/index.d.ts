import type { SvelteComponentTyped } from "svelte/internal";

export interface CarouselItem extends Record<string, any> {
  src: string;
  alt: string;
  srcset: string;
}

export interface CarouselProps {
  class?: string;
  compact?: boolean;
}

export interface CarouselEvents {
  click?: WindowEventMap["click"];
}

export interface CarouselSlots {
  slide: {};
}

declare class CarouselComponent extends SvelteComponentTyped<
  CarouselProps,
  CarouselEvents,
  CarouselSlots
> {}

export default CarouselComponent;
