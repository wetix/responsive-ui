import type { SvelteComponentTyped } from "svelte/internal";

export interface CardProps {
  id?: string;
  title?: string;
  class?: string;
  compact?: boolean;
  style?: string;
}

export interface CardEvents {
  click?: WindowEventMap["click"];
}

export interface CardSlots {
  default: Record<string, unknown>;
}

/**
 * Responsive card component
 *
 * ### Example
 * ```svelte
 * <script>
 *  import Card from '@responsive-ui/card';
 * </script>
 *
 * <Card>Hello world!</Card>
 * ```
 */
export declare class CardComponent extends SvelteComponentTyped<
  CardProps,
  CardEvents,
  CardSlots
> {}

export default CardComponent;
