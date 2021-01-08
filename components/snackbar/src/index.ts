import { SvelteComponent, tick } from "svelte/internal";

import Snackbar from "./Snackbar.svelte";
import type { SnackbarProps } from "../types";

const queue: Array<SvelteComponent> = [];

const show = (props: SnackbarProps) => {
  const { timeout = 3000 } = props;
  props = Object.assign({ rounded: true }, props);
  const component = new Snackbar({
    target: document.body,
    props,
    intro: true,
  });

  const pos = queue.length;
  const onClose = () => {
    setTimeout(async () => {
      const arr = queue.splice(pos, 1);
      if (arr.length > 0) {
        arr[0].$set({ show: false });
        await tick();
        setTimeout(() => {
          arr[0].$destroy();
        }, 50);
      }
    }, timeout);
  };

  if (timeout > 0) {
    onClose();
  }
  queue.push(component);
  return {
    close() {
      onClose();
    },
  };
};

export default Snackbar;
export { show };
