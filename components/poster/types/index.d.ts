import type { SvelteComponentTyped } from "svelte/internal";

export interface PosterProps {
  class?: string;
  src: string;
  width?: string;
  height?: string;
  shadowed?: boolean;
  rounded?: boolean;
  size?: "small" | "medium";
  style?: string;
}

export interface PosterEvents {
  click?: any;
}

declare class Poster extends SvelteComponentTyped<PosterProps, PosterEvents> {}

export default Poster;
