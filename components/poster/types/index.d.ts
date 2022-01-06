import type { SvelteComponentTyped } from "svelte/internal";

export interface PosterProps {
  id?: string;
  class?: string;
  type?: "portrait" | "landscape" | "square";
  src: string;
  responsive?: boolean;
  shadowed?: boolean;
  rounded?: boolean;
  style?: string;
}

export interface PosterEvents {
  click?: WindowEventMap["click"];
}

export interface PosterSlots {}

export declare class PosterComponent extends SvelteComponentTyped<
  PosterProps,
  PosterEvents,
  PosterSlots
> {}

export default PosterComponent;
