import type { SvelteComponentTyped } from "svelte/internal";

export interface DockerProps {
  id?: string;
  title?: string;
  class?: string;
  open?: boolean;
  caption: string;
  maskClosable?: boolean;
  width?: string | number;
  placement?: "left" | "right";
  style?: string;
}

export interface DockerSlots {
  default: Record<string, unknown>;
}

export declare class DockerComponent extends SvelteComponentTyped<
  DockerProps,
  Record<string, unknown>,
  DockerSlots
> {}

export default DockerComponent;
