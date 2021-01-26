import type { SvelteComponentTyped } from "svelte/internal";

export type DropdownItem = {
  title: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  divider?: boolean;
};

export type DropdownTriggerMode = "click" | "hover" | "context";

interface DropdownProps {
  title: string;
  disabled?: boolean;
  items: DropdownItem[];
  size: number;
  trigger: DropdownTriggerMode;
  maxDisplayItem: number;
}

interface DropdownSlot {
  default: {};
}

declare class Dropdown extends SvelteComponentTyped<DropdownProps, _, DropdownSlot> {}

export default Dropdown;
