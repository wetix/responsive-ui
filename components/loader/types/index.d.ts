import type { SvelteComponentTyped } from "svelte/internal";

export interface LoaderProps {
  fit?: "viewport" | "none";
  size?: "default" | "small";
}

export interface LoaderEvents {}

export interface LoaderSlots {}

export declare class LoaderComponent extends SvelteComponentTyped<
  LoaderProps,
  LoaderEvents,
  LoaderSlots
> {}

export default LoaderComponent;
