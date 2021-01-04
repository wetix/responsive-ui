<script context="module" lang="ts">
  import { writable } from "svelte/store";
  import type { Writable } from "svelte/store";

  const queue: Writable<any>[] = [];

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
  window.addEventListener("resize", (e) => {
    // console.log(window.navigator.userAgent);
    const { width, height } = screen;
    queue.forEach((store) => {
      store.update((v) =>
        Object.assign(v, { aspectRatio: width / height, width, height })
      );
    });
  });

  const createStore = () => {
    const { width, height } = screen;
    const store$ = writable({
      orientation: screen.orientation.type,
      aspectRatio: width / screen.height,
      width,
      height,
    });
    queue.push(store$);
    return store$;
  };
</script>

<script lang="ts">
  const store$ = createStore();

  store$.subscribe((v) => {
    console.log("Result =>", v);
  });
</script>

<style lang="scss">
</style>

<slot aspectRatio={$store$.aspectRatio} orientation={$store$.orientation} />
