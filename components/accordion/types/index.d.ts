import type { SvelteComponentTyped } from "svelte/internal";

export interface AccordionItem extends Record<string, any> {
  label: string;
  content?: any;
  disabled?: boolean;
  collapsed?: boolean;
}

export interface AccordionProps {
  class?: string;
  items: AccordionItem[];
  multiple?: boolean;
  style?: string;
}

export interface AccordionEvents {}

export interface AccordionSlots {
  label: { index: number };
  item: {
    index: number;
  };
}

declare class Accordion extends SvelteComponentTyped<
  AccordionProps,
  AccordionEvents,
  AccordionSlots
> {}

export default Accordion;
