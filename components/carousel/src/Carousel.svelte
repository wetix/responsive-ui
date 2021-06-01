<script lang="ts">
  import type { CarouselItem } from "../types/index";

  export let items: CarouselItem[] = [];

  let offset = 0;

</script>

<div class="items" style="transform: translateX({offset}px);">
  {#each items as item, i}
    <div class="item" style="background-color: hsla({i * 25}deg, 75%, 55%);">
      {item}
    </div>
  {/each}
</div>

<style lang="scss">
</style>
