<script>
  import { onMount, createEventDispatcher } from "svelte";

  //   import Icon from "../../../media/Icon.svelte";
  import { getAttrFromEvent, execIfContains } from "~/utils/dom.ts";

  const dispatch = createEventDispatcher();

  export let options = [],
    name = "",
    value = "",
    placeholder = "",
    readonly = false,
    disabled = false,
    filter = (v) => true,
    style = "";

  const items = options.reduce((acc, { title, value }) => {
    acc[value] = title;
    return acc;
  }, {});

  let focus = false,
    container,
    select,
    clientHeight,
    results = options.slice();

  $: checkSelected = (v) => v === value;

  const onSelect = (e) => {
    const item = getAttrFromEvent(e, "data-item");
    if (item) {
      const data = JSON.parse(item);
      const v = data.value || "";
      value = select.value = v;
      dispatch("change", data);
      setTimeout(() => {
        focus = false;
      }, 200);
    }
  };

  const onInput = (e) => {
    const { value } = e.target;
    results = options.filter((f) => filter(value, f));
  };
</script>

<style lang="scss">
  .select {
    position: relative;
    width: 100%;
    border: 1px solid red;
    border-radius: var(--small-border-radius, 3px);

    &.disabled {
      cursor: not-allowed !important;
      opacity: 0.5;
    }

    select {
      position: fixed;
      height: 0;
      width: 0;
      top: -99999px;
      left: -99999px;
    }

    //   .arrow {
    //     stroke: #bebebe;
    //     text-align: center;
    //     // flex: 0 0 26px;
    //     line-height: 0;
    //     transition: transform 0.3s;

    //     &.focus {
    //       transform: rotate(180deg);
    //     }
    //   }
    // }

    .select-options {
      position: absolute;
      top: 42px;
      left: 0;
      min-width: 100%;
      margin: 0;
      padding: 0;
      user-select: none;
      overflow-x: hidden;
      overflow-y: auto;
      border-radius: var(--small-border-radius, 3px);
      box-shadow: 0 0 26px rgba(0, 0, 0, 0.15);
      background: #fff;
      transition: all 0.5s;
      max-height: 152px;
      z-index: 100;

      .option {
        cursor: pointer;
        white-space: nowrap;
        height: 32px;
        line-height: 32px;
        transition: all 0.3s;
        transition-property: background, color;
        padding: 0 10px;

        &:hover:not(.disabled) {
          color: var(--primary-color, #fc4451);
          background: #f5f5f5;
        }

        &.selected {
          color: var(--primary-color, #fc4451);
          //   background: $light-theme-color !important;
        }

        &.disabled {
          cursor: not-allowed !important;
          color: rgba(0, 0, 0, 0.25);
          background: #f5f5f5;
        }
      }

      .empty {
        text-align: center;
        padding: 5px;
      }
    }
  }

  /* mobile view */
  @media only screen and (max-width: 768px) {
    .select-options {
      position: fixed;
      top: auto;
      left: 0;
      bottom: 0;
    }
  }
</style>

<svelte:body on:click={execIfContains(container, () => (focus = false))} />

<div
  bind:this={container}
  class="select"
  class:focus
  class:disabled
  on:click={!disabled ? () => (focus = !focus) : null}
  {style}>
  <div>
    <select {name} bind:this={select}>
      {#each options as item}
        <option value={item.value || ''}>{item.title || ''}</option>
      {/each}
    </select>
    <input
      autocomplete="off"
      {readonly}
      on:input={onInput}
      {placeholder}
      {disabled}
      value={items[value] || ''} />
    <span class="arrow" class:focus>
      <!-- <Icon type="arrow-down" /> -->
    </span>
  </div>
  <div
    class="select-options"
    on:click={onSelect}
    style={`height:${focus ? clientHeight : 0}px`}>
    <div bind:clientHeight style="padding:6px 0">
      {#if results.length === 0}
        <div class="empty">No data</div>
      {:else}
        {#each results as item}
          <div
            class={`option ${item.class || ''}`}
            class:disabled={item.disabled || false}
            class:selected={checkSelected(item.value)}
            data-item={!item.disabled ? JSON.stringify(item) : null}>
            {item.title || item.value || ''}
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>
