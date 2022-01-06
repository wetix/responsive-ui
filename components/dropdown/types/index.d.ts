import type { SvelteComponentTyped } from "svelte/internal";

export type DropdownItem = {
  label: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  divider?: boolean;
};

export type DropdownTriggerMode = "click" | "hover" | "contextmenu";

interface DropdownProps {
  id?: string;
  class?: string;
  disabled?: boolean;
  items: DropdownItem[];
  value?: string[];
  size?: number;
  trigger: DropdownTriggerMode;
}

interface DropdownSlot {
  default: {};
}

declare class DropdownComponent extends SvelteComponentTyped<
  DropdownProps,
  _,
  DropdownSlot
> {}

export default DropdownComponent;
