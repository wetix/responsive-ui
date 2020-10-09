<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  //   import Icon from "../../../media/Icon.svelte";
  import { getAttrFromEvent, execIfContains } from "~/utils/dom.ts";

  const dispatch = createEventDispatcher();

  export let options = [],
    name = "",
    value = "",
    placeholder = "Select",
    readonly = false,
    disabled = false,
    filter = (v) => true,
    style = "",
    itemText = "title",
    itemValue = "value",
    returnObject = false,
    label = "";

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

  let isOpen = false;

  const onSelect = (item) => {
    // const item = getAttrFromEvent(e, "data-item");
    // if (item) {
    //   const data = JSON.parse(item);
    //   const v = data.value || "";
    //   value = select.value = v;
    //   dispatch("change", data);
    //   setTimeout(() => {
    //     focus = false;
    //   }, 200);
    // }
    if (returnObject) {
      value = item
    } else {
      value = item[itemValue]
    }
  };

  const onInput = (e) => {
    const { value } = e.target;
    results = options.filter((f) => filter(value, f));
  };

  const getSelectedValue = () => {
    if (!returnObject) {
      return items[itemValue] || placeholder
    }
    return items[itemText] || placeholder
  }
</script>

<style lang="scss">
  .selection {
    width: 480px;

    label {
      display: block;
      color: #06002b;
      font-size: 16px;
      margin-bottom: 5px;
    }

    &-wrapper {
      position: relative;

      .selection-inner {
        width: 100%;
        border-radius: 10px;
        border: solid 0.5px var(--form_smallwords, #e1e1e1);

        .selection-input {
          cursor: default;
          position: relative;
          max-width: 480px;
          width: 100%;
          border-radius: 10px;
          background-color: #fff;
          padding: 14px 40px 14px 16px;
          appearance: none;
          outline: none;
          text-align: left;
          overflow: visible;
          text-transform: none;
          margin: 0;
          border: none;
          font-size: 16px;
          box-sizing: border-box;

          .selected {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 16px;
            color: #000;

            &.empty {
              color: #9e9e9e
            }
          }
        }
      }

      .selection-options {
        position: absolute;
        width: 100%;
        border-radius: 5px;
        box-shadow: 0 2px 7px 0 rgba(252, 68, 81, 0.15);
        border: solid 0.5px #fc4451;
        background-color: #fff;
        max-height: 168px;
        overflow: auto;

        ul {
          list-style: none;
          padding-inline-start: 0;
          margin-block-start: 0;
          margin-block-end: 0;
          outline: none;

          li {
            padding: 12px 16px;
            position: relative;
            user-select: none;

            &:hover {
              background-color: rgba(252, 68, 81, 0.1);
            }
          }
        }

        &--text {
          display: block;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        &--icon {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          padding-right: 16px;
          display: flex;
          align-items: center;
          color: #fc4451;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
<!--class="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"-->
<svelte:body on:click={execIfContains(container, () => (focus = false))} />

<div class="selection">
  <label for="selection">
    {label}
  </label>
  <div class="selection-wrapper">
    <div class="selection-inner" on:click={() => {isOpen = !isOpen}}>
      <input
        id="selection"
        class="selection-input"
        on:input={onInput}
        autocomplete="off"
        {readonly}
        {placeholder}
        {disabled}
        value={items[value] || ''}
      />
      <div class="selection-options--icon" style="color:#000;">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
      </div>
    </div>

    {#if isOpen}
      <div class="selection-options" transition:fade="{{ duration: 150 }}">
        {#if results.length < 1}
          <div>No data</div>
        {:else}
          <ul tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3">
            {#each results as item}
              <li
                id="listbox-option-0"
                role="option"
                on:click={onSelect(item)}
              >
                <span
                  class="selection-options--text"
                >
                  {item.title}
                </span>
                  <span class="selection-options--icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </span>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/if}
  </div>
</div>

<!--<script>-->
<!--  import { onMount, createEventDispatcher } from "svelte";-->

<!--  //   import Icon from "../../../media/Icon.svelte";-->
<!--  import { getAttrFromEvent, execIfContains } from "~/utils/dom.ts";-->

<!--  const dispatch = createEventDispatcher();-->

<!--  export let options = [],-->
<!--    name = "",-->
<!--    value = "",-->
<!--    placeholder = "",-->
<!--    readonly = false,-->
<!--    disabled = false,-->
<!--    filter = (v) => true,-->
<!--    style = "";-->

<!--  const items = options.reduce((acc, { title, value }) => {-->
<!--    acc[value] = title;-->
<!--    return acc;-->
<!--  }, {});-->

<!--  let focus = false,-->
<!--    container,-->
<!--    select,-->
<!--    clientHeight,-->
<!--    results = options.slice();-->

<!--  $: checkSelected = (v) => v === value;-->

<!--  const onSelect = (e) => {-->
<!--    const item = getAttrFromEvent(e, "data-item");-->
<!--    if (item) {-->
<!--      const data = JSON.parse(item);-->
<!--      const v = data.value || "";-->
<!--      value = select.value = v;-->
<!--      dispatch("change", data);-->
<!--      setTimeout(() => {-->
<!--        focus = false;-->
<!--      }, 200);-->
<!--    }-->
<!--  };-->

<!--  const onInput = (e) => {-->
<!--    const { value } = e.target;-->
<!--    results = options.filter((f) => filter(value, f));-->
<!--  };-->
<!--</script>-->

<!--<style lang="scss">-->
<!--  .select {-->
<!--    position: relative;-->
<!--    width: 100%;-->
<!--    border-radius: var(&#45;&#45;small-border-radius, 3px);-->

<!--    &.disabled {-->
<!--      cursor: not-allowed !important;-->
<!--      opacity: 0.5;-->
<!--    }-->

<!--    select {-->
<!--      position: fixed;-->
<!--      height: 0;-->
<!--      width: 0;-->
<!--      top: -99999px;-->
<!--      left: -99999px;-->
<!--    }-->

<!--    //   .arrow {-->
<!--    //     stroke: #bebebe;-->
<!--    //     text-align: center;-->
<!--    //     // flex: 0 0 26px;-->
<!--    //     line-height: 0;-->
<!--    //     transition: transform 0.3s;-->

<!--    //     &.focus {-->
<!--    //       transform: rotate(180deg);-->
<!--    //     }-->
<!--    //   }-->
<!--    // }-->

<!--    .select-options {-->
<!--      position: absolute;-->
<!--      top: 30px;-->
<!--      left: 0;-->
<!--      min-width: 100%;-->
<!--      margin: 0;-->
<!--      padding: 0;-->
<!--      user-select: none;-->
<!--      overflow-x: hidden;-->
<!--      overflow-y: auto;-->
<!--      border: 0.5px solid #fc4451;-->
<!--      border-radius: var(&#45;&#45;small-border-radius, 3px);-->
<!--      box-shadow: 0 0 26px rgba(0, 0, 0, 0.15);-->
<!--      background: #fff;-->
<!--      transition: all 0.5s;-->
<!--      max-height: 152px;-->
<!--      z-index: 20;-->

<!--      .option {-->
<!--        cursor: pointer;-->
<!--        white-space: nowrap;-->
<!--        height: 32px;-->
<!--        line-height: 32px;-->
<!--        transition: all 0.3s;-->
<!--        transition-property: background, color;-->
<!--        padding: 0 10px;-->

<!--        &:hover:not(.disabled) {-->
<!--          color: var(&#45;&#45;primary-color, #fc4451);-->
<!--          background: #f5f5f5;-->
<!--        }-->

<!--        &.selected {-->
<!--          color: var(&#45;&#45;primary-color, #fc4451);-->
<!--          //   background: $light-theme-color !important;-->
<!--        }-->

<!--        &.disabled {-->
<!--          cursor: not-allowed !important;-->
<!--          color: rgba(0, 0, 0, 0.25);-->
<!--          background: #f5f5f5;-->
<!--        }-->
<!--      }-->

<!--      .empty {-->
<!--        text-align: center;-->
<!--        padding: 5px;-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  /* mobile view */-->
<!--  @media only screen and (max-width: 768px) {-->
<!--    .select-options {-->
<!--      position: fixed;-->
<!--      top: auto;-->
<!--      left: 0;-->
<!--      bottom: 0;-->
<!--    }-->
<!--  }-->
<!--</style>-->

<!--<svelte:body on:click={execIfContains(container, () => (focus = false))} />-->

<!--<div-->
<!--  bind:this={container}-->
<!--  class="select"-->
<!--  class:focus-->
<!--  class:disabled-->
<!--  on:click={!disabled ? () => (focus = !focus) : null}-->
<!--  {style}>-->
<!--  <div>-->
<!--    <select {name} bind:this={select}>-->
<!--      {#each options as item}-->
<!--        <option value={item.value || ''}>{item.title || ''}</option>-->
<!--      {/each}-->
<!--    </select>-->
<!--    <input-->
<!--      autocomplete="off"-->
<!--      {readonly}-->
<!--      on:input={onInput}-->
<!--      {placeholder}-->
<!--      {disabled}-->
<!--      value={items[value] || ''} />-->
<!--    <span class="arrow" class:focus>-->
<!--      &lt;!&ndash; <Icon type="arrow-down" /> &ndash;&gt;-->
<!--    </span>-->
<!--  </div>-->
<!--  <div-->
<!--    class="select-options"-->
<!--    on:click={onSelect}-->
<!--    style={`height:${focus ? clientHeight : 0}px`}>-->
<!--    <div bind:clientHeight style="padding:6px 0">-->
<!--      {#if results.length === 0}-->
<!--        <div class="empty">No data</div>-->
<!--      {:else}-->
<!--        {#each results as item}-->
<!--          <div-->
<!--            class={`option ${item.class || ''}`}-->
<!--            class:disabled={item.disabled || false}-->
<!--            class:selected={checkSelected(item.value)}-->
<!--            data-item={!item.disabled ? JSON.stringify(item) : null}>-->
<!--            {item.title || item.value || ''}-->
<!--          </div>-->
<!--        {/each}-->
<!--      {/if}-->
<!--    </div>-->
<!--  </div>-->
<!--</div>-->
