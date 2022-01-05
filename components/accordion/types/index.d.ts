import type { SvelteComponentTyped } from "svelte/internal";

export interface AccordionProps {
  id?: string;
  caption?: string;
  class?: string;
  disabled?: boolean;
  collapsed?: boolean;
  style?: string;
}

export interface AccordionEvents {
  change?: WindowEventMap["change"];
}

export interface AccordionSlots {
  label: {};
  default: {
    collapsed: boolean;
    disabled: boolean;
  };
}

export declare class AccordionComponent extends SvelteComponentTyped<
  AccordionProps,
  AccordionEvents,
  AccordionSlots
> {}

export default AccordionComponent;
