import type { SvelteComponentTyped } from "svelte/internal";

export interface DatePickerProps {
  class?: string;
  placeholder?: string;
  value?: string;
  ref?: null | HTMLInputElement;
  size: "small" | "default" | "large";
  name?: string;
  readonly?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  format?: (v: Date) => string;
  disabledDate?: (v: Date) => boolean;
}

export interface DatePickerEvents {
  change?: void;
}

export interface DatePickerSlots {}

declare class DatePicker extends SvelteComponentTyped<
  DatePickerProps,
  DatePickerEvents,
  DatePickerSlots
> {}

export default DatePicker;
