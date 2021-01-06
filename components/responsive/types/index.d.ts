import type { SvelteComponentTyped } from "svelte/internal";

declare module "*.svelte" {
  export { SvelteComponentDev as default } from "svelte/internal";
}

export interface ResponsiveProps {}

export interface ResponsiveEvents {}

export interface ResponsiveSlots {
  default: {
    aspectRatio: number;
    orientation:
      | "landscape-primary"
      | "landscape-secondary"
      | "portrait-primary"
      | "portrait-secondary";
  };
}

declare class Responsive extends SvelteComponentTyped<
  ResponsiveProps,
  ResponsiveEvents,
  ResponsiveSlots
> {}

export default Responsive;
