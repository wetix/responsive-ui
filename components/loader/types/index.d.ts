import type { SvelteComponentTyped } from "svelte/internal";

export interface LoaderProps {
  fit?: "viewport" | "none";
  size?: "default" | "small";
}

export declare class LoaderComponent extends SvelteComponentTyped<LoaderProps> {}

export default LoaderComponent;
