import type { SvelteComponentTyped } from "svelte/internal";

export interface PosterProps {
  class?: string;
  src: string;
  responsive?: boolean;
  shadowed?: boolean;
  rounded?: boolean;
  style?: string;
}

export interface PosterEvents {
  click?: WindowEventMap["click"];
}

declare class Poster extends SvelteComponentTyped<PosterProps, PosterEvents> {}

export default Poster;
