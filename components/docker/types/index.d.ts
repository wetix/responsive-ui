import type { SvelteComponentTyped } from "svelte/internal";

export interface DockerProps {
  class?: string;
  open?: boolean;
  maskClosable?: boolean;
  width?: string;
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
