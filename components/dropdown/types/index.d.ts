import type { SvelteComponentTyped } from "svelte/internal";

export type DropdownItem = {
  title: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
};

interface DropdownProps {
  title: string;
  disabled?: boolean;
  items: DropdownItem[];
  size: number;
}

interface DropdownSlot {
  default: {};
}

declare class Select extends SvelteComponentTyped<DropdownProps, _, DropdownSlot> {}

export default Select;
