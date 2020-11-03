<script lang="ts">
  import {createEventDispatcher} from "svelte";
  import { fade } from "svelte/transition";
  //   import Icon from "../../../media/Icon.svelte";
  import {getAttrFromEvent, execIfContains} from "~/utils/dom.ts";

  const dispatch = createEventDispatcher();

  export let options = [],
    name = "",
    placeholder = "Select",
    readonly = false,
    disabled = false,
    filter = (v) => true,
    style = "",
    label = "",
    multiple = false,
    value = multiple ? [] : "";

  const items = options.reduce((acc, { title, value }) => {
    acc[value] = title;
    return acc;
  }, {});

  let focus = false,
    container,
    select,
    clientHeight,
    results = options.slice(),
    clonedValue = value;

  $: checkSelected = (v) => {
    if (!multiple) {
      return v === value
    }
    return value.some(el => el === v)
  };

  $: getSelectedValue = () => {
    if (!multiple) {
      return items[value] || ""
    }
    if (value.length === 1) {
      return items[value[0]]
    }
    if (value.length > 1) {
      return `${value.length} items selected`
    }
    return ""
  }

  let isOpen = false;

  const onSelect = (e) => {
    const item = getAttrFromEvent(e, "data-item");
    const data = JSON.parse(item);
    if (item && !multiple) {
      value = data.value || "";
      isOpen = false
    } else if (item && multiple && typeof value !== "string") {
      const idx = value.findIndex(el => el === data.value);
      if (idx === -1) {
        value.push(data.value);
      } else {
        value.splice(idx, 1);
      }
      value = value;
    }
    dispatch("change", data);
  };

  const onInput = (e) => {
    const { value } = e.target;
    results = options.filter((f) => f.title.toUpperCase().includes(value.toUpperCase()));
  };
</script>

<style lang="scss">
  .selection {
    max-width: 480px;
    width: 100%;

    label {
      display: block;
      color: #06002b;
      font-size: 16px;
      margin-bottom: 7px;
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
<!--<svelte:body on:click={execIfContains(container, () => (focus = false))} />-->

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
        value={getSelectedValue()}
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
          <ul
            tabindex="-1"
            on:click={onSelect}
            role="listbox"
            aria-labelledby="listbox-label"
          >
            {#each results as item}
              <li
                id="listbox-option-0"
                role="option"
                data-item={!item.disabled ? JSON.stringify(item) : null}
              >
                <span
                  class="selection-options--text"
                >
                  {item.title}
                </span>
                {#if checkSelected(item.value)}
                  <span class="selection-options--icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </span>
                {/if}
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/if}
  </div>
</div>