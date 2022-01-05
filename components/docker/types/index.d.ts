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

export interface DockerEvents {}

export interface DockerSlots {
  default: {};
}

declare class Docker extends SvelteComponentTyped<
  DockerProps,
  DockerEvents,
  DockerSlots
> {}

export default Docker;
