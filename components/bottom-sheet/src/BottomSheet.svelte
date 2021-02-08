<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "@responsive-ui/button";
  import BottomModal from "@responsive-ui/bottom-modal";
  import Tab from "@responsive-ui/tab";

  import type { BottomSheetItem } from "../types";
  import Option from "./Option.svelte";

  const dispatch = createEventDispatcher();

  export let items: BottomSheetItem[] = [];
  export let open = false;
  export let selected = 0;
  export let disabled = false;
  export let closable = true;

  $: height = window.innerHeight * 0.8;
  items = items.map((v) => {
    if (v.selected) return v;
    v.selected = new Map();
    return v;
  });

  const onOptionChange = ({ detail }: CustomEvent<any>) => {
    const { checked, value } = detail;
    if (checked) items[selected].selected?.set(value, true);
    else items[selected].selected?.delete(value);
    dispatch("change", {
      selected,
      value: items[selected].selected,
    });
  };

  const closeModal = () => {
    setTimeout(() => {
      open = false;
    }, 150);
  };

  const onReset = () => {
    for (let i = 0; i < items.length; i++) {
      items[i].selected = new Map();
    }
    dispatch("reset");
    closeModal();
  };

  const onFilter = () => {
    dispatch("filter", {
      value: items.map((v) => v.selected),
    });
    closeModal();
  };
</script>

<BottomModal bind:open {closable}>
  <div class="responsive-ui-bottom-sheet" style={`height:${height}px;`}>
    <header class="responsive-ui-bottom-sheet__header">
      <span class="responsive-ui-bottom-sheet__reset" on:click={onReset}
        >Reset</span
      >
    </header>
    <Tab {items} bind:selected>
      <div
        class="responsive-ui-bottom-sheet__body"
        style={`height:${height - 150}px`}
      >
        {#each items[selected].options || [] as opt (opt.value)}
          <Option
            {...opt}
            checked={items[selected].selected?.has(opt.value)}
            on:change={onOptionChange}
          />
        {/each}
      </div>
    </Tab>
  </div>
  <footer class="responsive-ui-bottom-sheet__footer">
    <Button {disabled} on:click={onFilter}>FILTER</Button>
  </footer>
</BottomModal>

<style lang="scss">
  .responsive-ui-bottom-sheet {
    padding-top: var(--padding, 15px);
    position: relative;

    &__header {
      padding: 0 15px 5px;
    }

    &__body {
      overflow-y: auto;
      padding: 12px 15px;
    }

    &__reset {
      cursor: pointer;
      color: var(--primary-color, #fc4451);
    }

    &__footer {
      box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.1);
      background: var(--background-color, #fff);
      padding: 12px 15px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
