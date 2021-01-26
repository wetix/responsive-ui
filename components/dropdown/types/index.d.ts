import type { SvelteComponentTyped } from "svelte/internal";

export type DropdownItem = {
  title: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
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

declare class Select extends SvelteComponentTyped<DropdownProps, _, DropdownSlot> {}

export default Select;
