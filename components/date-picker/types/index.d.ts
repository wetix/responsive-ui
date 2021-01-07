import type { SvelteComponentTyped } from "svelte/internal";

export interface DatePickerProps {
  name?: string;
  disabled?: boolean;
  readonly?: boolean;
  value?: string;
  placeholder?: string;
}

export interface DatePickerEvents {}

export interface DatePickerSlots {
  default: {};
}

declare class DatePicker extends SvelteComponentTyped<
  DatePickerProps,
  DatePickerEvents,
  DatePickerSlots
> {}

export default DatePicker;
