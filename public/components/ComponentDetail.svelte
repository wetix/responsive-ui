<script lang="ts">
  import { onMount } from "svelte";
  import { get_current_component } from "svelte/internal";

  export let name = "unknown";

  let clientHeight;
  const component = get_current_component();
  let hide = false;
  let slot;
  let rect;

  onMount(() => {
    console.log(component.$$);
    console.log(component.$$.fragment.c());
    // rect = slot.getBoundingClientRect();
    // console.log(rect);
  });
</script>

<style lang="scss">
  .slot {
    position: relative;
    display: inline-flex;

    .bounding-box {
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      border-radius: 5px;
      border-color: #fc4451;
      border-style: solid;
      border-width: 2px;

      .component-name {
        left: 50%;
        transform: translateX(-50%);
        display: inline-flex;
        white-space: nowrap;
        padding: 4px 6px;
        border-radius: 5px;
        font-size: 10px;
        line-height: 11px;
        position: relative;
        bottom: 28px;
        background: #fc4451;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
        color: #fff;
      }
    }
  }
</style>

<!-- <div class="slot" bind:this={slot} on:mouseover={() => (hide = false)}> -->
<slot />
{#if rect && !hide}
  <div class="bounding-box">
    <div class="component-name">{name}</div>
  </div>
{/if}
<!-- </div> -->
