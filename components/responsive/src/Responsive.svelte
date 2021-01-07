<script context="module" lang="ts">
  import { writable } from "svelte/store";
  import type { Writable } from "svelte/store";
  import type { ResponsiveState } from "../types";

  const queue: Writable<ResponsiveState>[] = [];

  if (window.screen.orientation) {
    window.screen.orientation.addEventListener("change", () => {
      queue.forEach((store) => {
        store.update((v) =>
          Object.assign(v, { orientation: screen.orientation.type })
        );
      });
    });
  }

  // landscape and portrait
  window.addEventListener("resize", () => {
    const { width, height } = screen;
    queue.forEach((store) => {
      store.update((v) =>
        Object.assign(v, { aspectRatio: width / height, width, height })
      );
    });
  });

  const createStore = () => {
    const { width, height } = screen;
    const store$ = writable<ResponsiveState>({
      orientation: screen.orientation.type,
      aspectRatio: width / height,
    });
    queue.push(store$);
    return store$;
  };
</script>

<script lang="ts">
  const store$ = createStore();
</script>

<slot aspectRatio={$store$.aspectRatio} orientation={$store$.orientation} />
