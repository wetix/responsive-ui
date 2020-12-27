import type { SvelteComponent } from "svelte/internal";

import Snackbar from "./Snackbar.svelte";
import type { SnackbarProps } from "../types";

const queue: Array<SvelteComponent> = [];
const success = (props: SnackbarProps) => {
  props = Object.assign({ rounded: true, timeout: 3000 }, props);
  const component = new Snackbar({
    target: document.body,
    props,
  });
  const pos = queue.length;
  // component.$$.on_destroy.push(() => {
  // });
  if (props.timeout > 0) {
    setTimeout(() => {
      const first = queue.splice(pos, 1);
      // @ts-ignore
      first.$destroy();
    }, props.timeout);
  }
  queue.push(component);
  // FIXME : should return close and open
  return component;
};

export default Snackbar;
export { success };
