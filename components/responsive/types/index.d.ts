import type { SvelteComponentTyped } from "svelte/internal";

declare module "*.svelte" {
  export { SvelteComponentDev as default } from "svelte/internal";
}

export type ResponsiveState = {
  aspectRatio: number;
  innerWidth: number;
  orientation:
    | "landscape-primary"
    | "landscape-secondary"
    | "portrait-primary"
    | "portrait-secondary";
};

export interface ResponsiveProps {}

export interface ResponsiveEvents {}

export interface ResponsiveSlots {
  default: ResponsiveState;
}

export declare class ResponsiveComponent extends SvelteComponentTyped<
  ResponsiveProps,
  ResponsiveEvents,
  ResponsiveSlots
> {}

export default ResponsiveComponent;
