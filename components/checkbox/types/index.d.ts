import type { SvelteComponentTyped } from "svelte/internal";

export interface CheckboxProps {
  name: string;
  options: CheckboxOptions[];
  value: (string | number)[];
}

export type CheckboxOptions = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export interface CheckboxEvents {
  change?: (
    e: CustomEvent<{ value: string | number; checked: boolean }>
  ) => void;
}
export interface CheckboxSlots {
  default: {};
}

declare class Checkbox extends SvelteComponentTyped<
  CheckboxProps,
  CheckboxEvents
> {}
export default Checkbox;
