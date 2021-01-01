<script context="module" lang="ts">
  import { writable } from "svelte/store";
  import type { Writable } from "svelte/store";

  const queue: Writable<any>[] = [];

  // landscape and portrait
  window.addEventListener("resize", (e) => {
    // console.log(window.navigator.userAgent);
    const { width, height } = screen;
    queue.forEach((store) => {
      // console.log();
      store.set({ aspectRatio: width / height, width, height });
    });
    // console.log("width =>", screen.width, ", height =>", screen.height);
    // console.log(e);
  });

  const createStore = () => {
    const { width } = screen;
    const store$ = writable({
      aspectRatio: width / screen.height,
      width,
      height: 0,
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

<slot aspectRatio={$store$.aspectRatio} />
