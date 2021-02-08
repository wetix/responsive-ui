import type { SvelteComponentTyped } from "svelte/internal";

export interface LoaderProps {
  fit?: "viewport" | "none";
  size?: "default" | "small";
}

declare class Loader extends SvelteComponentTyped<LoaderProps> {}

export default Loader;
