import type { SvelteComponentTyped } from "svelte/internal";

export type SelectOption = {
  label: string;
  disabled?: boolean;
  value: string;
};

interface SelectProps {
  id?: string;
  ref?: null | HTMLSelectElement;
  name?: string;
  size?: number;
  multiple?: boolean;
  value?: string | string[];
  disabled?: boolean;
  readonly?: boolean;
  options: SelectOption[];
  style?: string;
}

export interface SelectEvents {
  change?: WindowEventMap["change"];
  blur?: WindowEventMap["blur"];
}

declare class Select extends SvelteComponentTyped<SelectProps, SelectEvents> {}

export default Select;
