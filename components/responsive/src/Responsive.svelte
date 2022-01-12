<script context="module" lang="ts">
  import { writable } from "svelte/store";
  import type { Writable } from "svelte/store";
  import type { ResponsiveState } from "../types";

  const queue: { id: string; store: Writable<ResponsiveState> }[] = [];

  if (window.screen.orientation) {
    window.screen.orientation.addEventListener("change", () => {
      queue.forEach(({ store }) => {
        store.update((v) => Object.assign(v, { orientation: screen.orientation.type }));
      });
    });
  }

  // landscape and portrait
  window.addEventListener("resize", () => {
    const { width, height } = screen;
    queue.forEach(({ store }) => {
      store.update((v) =>
        Object.assign(v, {
          aspectRatio: width / height,
          width,
          height,
          innerWidth: window.innerWidth
        })
      );
    });
  });

  const createStore = (): [string, Writable<ResponsiveState>] => {
    const { width, height } = screen;
    const store$ = writable<ResponsiveState>({
      orientation: screen.orientation.type,
      aspectRatio: width / height,
      innerWidth: window.innerWidth
    });
    const id = `responsive-${Math.floor(Math.random() * Date.now())}`;
    queue.push({
      id,
      store: store$
    });
    return [id, store$];
  };

  const removeStore = (needle: string) => {
    const index = queue.findIndex(({ id }) => id === needle);
    if (index > -1) {
      queue.splice(index, 1);
    }
  };
</script>

<script lang="ts">
  import { onDestroy } from "svelte";

  const [id, store$] = createStore();

  onDestroy(() => {
    removeStore(id);
  });
</script>

<slot
  aspectRatio={$store$.aspectRatio}
  orientation={$store$.orientation}
  innerWidth={$store$.innerWidth}
/>
