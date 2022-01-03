<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "@responsive-ui/button";
  import BottomSheet from "@responsive-ui/bottom-sheet";
  import type { ActionSheetItem } from "../types";

  const dispatch = createEventDispatcher();

  let className = "";
  let selectedIndex = 0;
  let modalHeight = 0;
  export { className as class };
  export { selectedIndex as selected };
  export let items: ActionSheetItem[] = [];
  export let open = false;
  export let caption = "";
  export let disabled = false;
  export let maskClosable = true;
  export let closable = true;

  const tabName = `as_${Math.floor(Math.random() * Date.now())}`;

  const findElement = (e: Event) => {
    return e
      .composedPath()
      .find((v) => v instanceof HTMLElement && v.dataset.json) as HTMLElement;
  };

  const handleSelectOption = (e: Event) => {
    const el = findElement(e) as HTMLInputElement;
    if (!el) return;
    const item = JSON.parse(el.dataset.json as string) as ActionSheetItem;
    const { value, selected } = item;
    const { options = [] } = items[selectedIndex];
    const idx = options.findIndex((v) => v.value === value);
    if (idx < 1) return;
    if (selected) {
      options[idx].selected = false;
    } else {
      options[idx].selected = true;
    }
    items[selectedIndex].options = options;
    items = [...items];
    dispatch("valuechange", { option: options[idx] });
  };

  const handleTabChange = (e: Event) => {
    const el = findElement(e) as HTMLInputElement;
    if (!el) return;
    const item = JSON.parse(el.dataset.json as string);
    const { key } = item;
    const idx = items.findIndex((v) => v.key === key);
    if (idx < 1) return;
    if (el.checked) {
      items[idx].selected = true;
    } else {
      items[idx].selected = false;
    }
    items = [...items];
    dispatch("tabchange", { key, item });
  };

  const handleReset = () => {
    items = items.map((item) => {
      if (item.options) {
        item.options = item.options.map((v) => ({ ...v, selected: false }));
      }
      return item;
    });
    dispatch("reset", {});
  };

  const handleOk = () => {
    dispatch("ok", {});
  };
</script>

<BottomSheet
  bind:open
  bind:height={modalHeight}
  class={className}
  {maskClosable}
  {closable}
>
  <header class="resp-action-sheet__header">
    <div class="resp-action-sheet__header-label">
      <caption>{caption}</caption>
      <span class="resp-action-sheet__reset" on:click={handleReset}>Reset</span>
    </div>
    <ul class="resp-action-sheet__tab" on:change={handleTabChange}>
      {#each items as item (item.key)}
        <li data-json={JSON.stringify({ ...item, options: undefined })}>
          <label>
            <input
              name={tabName}
              type="radio"
              checked={item.selected || false}
            />
            {item.label}
          </label>
        </li>
      {/each}
    </ul>
  </header>
  <ul
    class="resp-action-sheet__body"
    style="height: {modalHeight - 200}px"
    on:change={handleSelectOption}
  >
    {#each items[selectedIndex].options || [] as { label, value, disabled = false, selected = false, ...otherProps }}
      <li
        class="resp-action-sheet__option"
        data-json={JSON.stringify({
          ...otherProps,
          label,
          value,
          selected,
          disabled,
        })}
      >
        <label>
          <input type="checkbox" {disabled} {value} checked={selected} />
          <div class="resp-action-sheet__option-label">{label}</div>
        </label>
      </li>
    {/each}
  </ul>
  <footer class="resp-action-sheet__footer">
    <Button variant="primary" {disabled} on:click={handleOk}>FILTER</Button>
  </footer>
</BottomSheet>

<style lang="scss" global>
  .resp-action-sheet {
    position: relative;
    padding-top: var(--padding, 1rem);

    &__header {
      // padding: 0 1rem;
      box-shadow: 0 5px 6px -4px rgba(0, 0, 0, 0.15);

      &-label {
        display: flex;
        align-items: center;
        padding: 0.25rem 1rem;
      }

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

    &__tab {
      display: flex;
      list-style: none;
      list-style-position: inside;
      padding: 0.5rem 0;
      margin: 0;
      overflow-x: auto;

      &::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
        width: 0px;
      }

      li {
        margin: 0 1rem;
      }

      label {
        cursor: pointer;
        white-space: nowrap;
      }

      input[type="radio"] {
        display: none;
      }
    }

    &__body {
      display: block;
      list-style: none;
      list-style-position: inside;
      overflow-y: auto;
      padding: 1rem;
      margin: 0;
    }

    &__option {
      border-bottom: 1px solid #f1f1f1;
      display: flex;
      position: relative;
      align-items: center;
      text-transform: capitalize;
      color: var(--text-color-black, #505050);

      &:last-child {
        border: none;
      }

      label {
        cursor: pointer;
        width: 100%;
      }

      input[type="checkbox"] {
        display: none;
      }

      input:checked ~ :after {
        position: absolute;
        right: 5px;
        top: 0px;
        font-size: 20px;
        content: "\02143";
        transform: rotate(40deg);
      }

      input:disabled ~ &-label {
        cursor: not-allowed;
        color: #ababab;
      }

      &-label {
        padding: 6px 0;
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
