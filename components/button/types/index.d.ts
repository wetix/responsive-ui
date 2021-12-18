import type { SvelteComponentTyped } from "svelte/internal";

/**
 * Button properties.
 */
export interface ButtonProps {
  /**
   * Specifies a unique id for an element
   */
  id?: string;
  /**
   * The variant of the button.
   */
  variant?: "default" | "primary";
  /**
   * The reference of the dom element.
   */
  ref?: HTMLButtonElement;
  /**
   * Specifies extra information about an element.
   */
  title?: string;
  /**
   * Specifies the name of the element.
   */
  name?: string;
  /**
   * The type attribute specifies the type of button.
   */
  type?: "button" | "submit" | "reset";
  /**
   * The HTML class attribute is used to specify a class for an HTML element.
   */
  class?: string;
  /**
   * Specifies that the specified element/group of elements should be disabled.
   */
  disabled?: boolean;
  /**
   * Specifies the outlined of the button.
   */
  outline?: boolean;
  /**
   * Specifies the name of the form the element belongs to.
   */
  form?: string;
  /**
   * Specifies where to send the form-data when a form is submitted. Only for type="submit".
   */
  formaction?: string;
  /**
   * Specifies an inline CSS style for an element.
   */
  style?: string;
}

/**
 * Component events.
 */
export interface ButtonEvents {
  /**
   * The onclick event occurs when the user clicks on an element.
   */
  click?: WindowEventMap["click"];
}

/**
 * Component slots.
 */
export interface ButtonSlots {
  default: {};
}

/**
 * Responsive button component
 *
 * ### Example
 * ```svelte
 * <script>
 *  import Button from '@responsive-ui/button';
 * </script>
 *
 * <Button>CLICK ME</Button>
 * ```
 */
declare class Button extends SvelteComponentTyped<
  ButtonProps,
  ButtonEvents,
  ButtonSlots
> {}

export default Button;
