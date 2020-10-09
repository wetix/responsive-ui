<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import Menu from "./Menu.svelte";
  import { getAttrFromEvent } from "../../utils/index.ts";

  const dispatch = createEventDispatcher();

  type IMenu = {
    title: string;
    selected: boolean;
    submenus: any[];
  };

  export let theme = "dark",
    items: IMenu[] = [],
    collapsed = false,
    selectedIds = [];

  const onSelect = (e) => {
    const item = getAttrFromEvent(e, "data-item");
    if (item) {
      // const index = JSON.parse(item) as number[];
      // const clone = items.slice();
      // let temp = clone;
      // for (let i = 0; i < index.length; i++) {
      //   if (i > 0) {
      //     temp = temp.submenus;
      //   }
      //   temp = temp[index[i]];
      // }
      // if (temp.selected) {
      //   temp.selected = false;
      // } else {
      //   temp.selected = true;
      // }
      // items = clone;
      // dispatch("select", {
      //   index,
      // });
    }
  };
</script>

<style lang="scss">
  .nav {
    display: inline-flex;
    background: #fafcff;
    border-right: 1px solid #dcdcdc;
    top: 0;
    left: 0;
    height: 100vh;
    width: 240px;
    transition: all 0.5s;

    // &.dark {
    //   background: #444444;
    //   color: #fff;
    // }

    &.light {
      color: #3b3b3b;
    }

    &.collapsed {
      width: 60px;
    }
  }

  @media only screen and (max-width: 650px) {
    .nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      min-height: 100%;
      overflow-y: auto;
      width: auto;
      z-index: 999;
    }
  }
</style>

<nav class={`nav ${theme}`} class:collapsed on:click={onSelect}>
  <Menu {items} {selectedIds} />
</nav>
