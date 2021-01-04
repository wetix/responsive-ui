<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "@responsive-ui/button";
  import BottomModal from "@responsive-ui/bottom-modal";
  import Tab from "@responsive-ui/tab";

  import type { Item } from "../types";
  import Option from "./Option.svelte";

  const dispatch = createEventDispatcher();

  export let items: Item[] = [];
  export let selected = 0;
  export let open = false;
  export let title = "";

  const onFilter = () => {};
</script>

<style lang="scss">
  .responsive-ui-bottom-sheet {
    padding-top: var(--padding, 15px);
    position: relative;

    &__header {
      padding: 0 15px 5px;
    }

    &__body {
      padding: 12px 15px;
    }

    &__reset {
      color: var(--primary-color, #fc4451);
    }

    &__footer {
      box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.1);
      padding: 12px 15px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>

<BottomModal bind:open>
  <div
    class="responsive-ui-bottom-sheet"
    style={`height:${window.innerHeight * 0.8}px;`}>
    <header class="responsive-ui-bottom-sheet__header">
      <span
        class="responsive-ui-bottom-sheet__reset"
        on:click={() => dispatch('reset')}>Reset</span>
    </header>
    <Tab {items} bind:selected>
      <div class="responsive-ui-bottom-sheet__body">
        {#each items[selected].options || [] as opt (opt.value)}
          <Option title={opt.title} value={opt.value} />
        {/each}
      </div>
    </Tab>
  </div>
  <footer class="responsive-ui-bottom-sheet__footer">
    <Button on:click={onFilter}>FILTER</Button>
  </footer>
</BottomModal>
