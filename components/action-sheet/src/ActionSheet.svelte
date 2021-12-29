<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "@responsive-ui/button";
  import BottomModal from "@responsive-ui/bottom-sheet";
  import type { ActionSheetItem } from "../types";

  const dispatch = createEventDispatcher();

  export let items: ActionSheetItem[] = [];
  export let open = false;
  export let caption = "";
  export let selected = 0;
  export let disabled = false;
  export let maskClosable = true;
  export let closable = true;

  let modalHeight = 0;
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
    // closeModal();
  };

  const onFilter = () => {
    dispatch("filter", {
      value: items.map((v) => v.selected),
    });
    // closeModal();
  };

  const handleClickOption = (e: Event) => {
    const el = e
      .composedPath()
      .find((v) => v instanceof HTMLElement && v.dataset.json) as HTMLElement;
    if (!el) return;
    const obj = JSON.parse(el.dataset.json as string);
    console.log(obj);
  };
</script>

<BottomModal bind:height={modalHeight} bind:open {maskClosable} {closable}>
  <header class="resp-action-sheet__header">
    <caption>{caption}</caption>
    <span class="resp-action-sheet__reset" on:click={onReset}>Reset</span>
  </header>
  <ul
    class="resp-action-sheet__body"
    style="height: {modalHeight - 170}px"
    on:click={handleClickOption}
  >
    {#each items[selected].options || [] as { value, label, checked = false }, idx (value)}
      <li
        class="resp-action-sheet__option"
        class:resp-action-sheet__option--checked={checked}
        data-json={JSON.stringify([selected, idx])}
      >
        <!-- <input id={value} type="checkbox" {value} {checked} /> -->
        <label for={value}>
          <span class="resp-action-sheet__option-label">{label}</span>
        </label>
      </li>
    {/each}
  </ul>
  <footer class="resp-action-sheet__footer">
    <Button variant="primary" {disabled} on:click>FILTER</Button>
  </footer>
</BottomModal>

<style lang="scss" global>
  .resp-action-sheet {
    position: relative;
    padding-top: var(--padding, 1rem);

    &__header {
      display: flex;
      padding: 0.5rem 1rem;
      align-items: center;
      box-shadow: 0 5px 6px -4px rgba(0, 0, 0, 0.15);

      caption {
        text-align: left;
        font-size: var(--font-size-lg, 24px);
        font-weight: 500;
        flex-grow: 1;
        min-width: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 0.25rem;
        overflow: hidden;
      }
    }

    &__body {
      list-style: none;
      list-style-position: inside;
      overflow-y: auto;
      padding: 1rem;
      margin: 0;
    }

    &__option {
      cursor: pointer;
      border-bottom: 1px solid #f1f1f1;
      display: flex;
      position: relative;
      align-items: center;
      padding: 6px 0;
      text-transform: capitalize;
      color: var(--text-color-black, #505050);

      &:last-child {
        border: none;
      }

      &--checked:after {
        position: absolute;
        right: 6px;
        top: -2px;
        font-size: 20px;
        content: "\02143";
        transform: rotate(40deg);
      }
    }

    &__reset {
      cursor: pointer;
      color: var(--primary-color, #fc4451);
    }

    &__footer {
      box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.1);
      background: var(--background-color, #fff);
      padding: 1rem;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      .resp-button {
        height: 42px;
        width: 100%;
      }
    }
  }
</style>
