<script lang="ts">
  import { zoom } from "@wetix/animation";
  import { getNodeAttribute } from "@wetix/utils";

  import type { SelectOption } from "../types";

  // import { onMount } from "svelte";

  // import Icon from "../../../media/Icon.svelte";
  // import { getAttrByEvent, execIfContains } from "../../../../util";

  export let options: SelectOption[] = [];
  export let disabled = false;

  const hashMap = new Map();

  let items = ["a", "b", "test", "testing"];
  // export let options = [],
  //   name = "",
  //   value = [],
  //   disabled = false,
  //   error = false,
  //   onChange = () => {},
  //   style = "";

  let show = true;
  let clientHeight;
  let results = [];
  // const items = options.reduce((acc, { title, value }) => {
  //   acc[value] = title;
  //   return acc;
  // }, {});

  // let focus = false,
  //   height,
  //   input,
  //   select,
  //   clientHeight,
  results = options.slice(); // filtered value

  // $: checkSelected = (v) => {
  //   return value.includes(v);
  // };

  const onSelect = (e: Event) => {
    const data = getNodeAttribute(e, "data-option");
    // console.log(item);
    if (data) {
      const [index, item] = <[number, { value: string }]>JSON.parse(data);
      options[index].selected = true;
      const pos = items.findIndex((v) => v === item.value);
      if (pos > -1) {
        items = items.filter((v) => v !== item.value);
      } else {
        items = [...items, item.value];
      }
      options = [...options];
      // console.log(index);
      //     onChange(e, value);
    }
  };

  const onClick = () => {
    show = !show;
  };

  const onRemove = (e) => {
    const index = getNodeAttribute(e, "data-index");
    if (index) {
      items.splice(parseInt(index, 10), 1);
      items = [...items];
      //     onChange(e, value);
    }
  };

  // const onFocus = () => {
  //   focus = !focus;
  //   if (focus) {
  //     input.focus();
  //   }
  // };
</script>

<!-- <svelte:body on:click={execIfContains(select, () => (focus = false))} /> -->

<div class="responsive-ui-select">
  <span class="responsive-ui-select__tags" on:click={onRemove}>
    {#each items as item, i}
      <span class="responsive-ui-select__tag" in:zoom out:zoom>
        <span>{item}</span>
        <span class="responsive-ui-select__close-icon" data-index={i}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512.001 512.001"
            style="enable-background:new 0 0 512.001 512.001;"
            xml:space="preserve">
            <g>
              <path
                d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
			L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
			c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
			l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
			L284.286,256.002z"
              />
            </g>
          </svg>
        </span>
      </span>
    {/each}
  </span>
  <input type="text" autocomplete="off" {disabled} on:click={onClick} />
  <div
    class="responsive-ui-select__dropdown"
    on:click={onSelect}
    style={`height:${show ? clientHeight : 0}px`}
  >
    <div bind:clientHeight style="padding:10px 0">
      {#each results as item, i}
        <div
          class="responsive-ui-select__option"
          class:responsive-ui-select__option--selected={item.selected || false}
          class:responsive-ui-select__option--disabled={item.disabled || false}
          data-option={JSON.stringify([i, item])}
        >
          {item.title || ""}
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- <span
  bind:this={select}
  class="multi-select"
  class:focus
  class:disabled
  bind:clientHeight={height}
  on:click={!disabled ? onFocus : null}
  {style}>
  <div class="selector">
    
    
  </div>
  <div
    class="options"
    on:click={onSelect}
    style={`top:${height + 10}px;height:${focus ? clientHeight : 0}px`}
  >
    <div bind:clientHeight style="padding:6px 0">
      {#if results.length === 0}
        <div class="empty">No data</div>
      {:else}
        {#each results as item}
          <div
            class={`option ${item.class || ""}`}
            class:disabled={item.disabled || false}
            class:selected={checkSelected(item.value)}
            data-item={!item.disabled ? JSON.stringify(item) : null}
          >
            {item.title || item.value || ""}
          </div>
        {/each}
      {/if}
    </div>
  </div>
</span> -->
<style lang="scss">
  .responsive-ui-select {
    position: relative;
    display: flex;
    width: 100%;
    border: 1px solid #f1f1f1;
    border-radius: var(--border-radius, 5px);
    height: var(--height, 34px);
    color: #1a1b1c;
    // padding: 0 10px;
    background: #f1f1f1;
    outline: none;
    box-sizing: border-box;

    &__tags {
      // border: 1px solid red;
      // display: inline-flex;
      padding: 4px 10px;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    &__tag {
      cursor: default;
      vertical-align: middle;
      display: inline-block;
      font-size: var(--font-size-sm, 12px);
      padding: 3px 6px;
      border-radius: var(--border-radius-sm, 3px);
      margin-right: 5px;
      background: #fff;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
    }

    input[type="text"] {
      flex-grow: 1;
      margin: 0;
      padding: 0;
      font-size: var(--font-size, 14px);
      font-family: var(--font-family, inherit);
      outline: none;
      // border: none;
      background: inherit;
    }

    &__close-icon {
      cursor: pointer;
      margin-left: 3px;
      display: inline-block;
      width: 8px;
      height: 8px;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    &__dropdown {
      position: absolute;
      top: 42px;
      background: #fff;
      left: 0;
      min-width: 100%;
      margin: 0;
      padding: 0;
      user-select: none;
      overflow-x: hidden;
      overflow-y: auto;
      transition: all 0.5s;
      border-radius: var(--border-radius, 5px);
      box-shadow: 0 0 26px rgba(0, 0, 0, 0.15);
      max-height: 200px;
      z-index: 10;
    }

    &__option {
      cursor: pointer;
      position: relative;
      white-space: nowrap;
      font-size: var(--font-size, 14px);
      // height: var(--height, 34px);
      // line-height: var(--height, 34px);
      transition: all 0.3s;
      transition-property: background, color;
      padding: 4px 10px;
      // padding-right:  + 8px;

      &:hover {
        background: #f5f5f5;
      }

      &--disabled {
        opacity: 0.5;
      }
    }
  }
  // .multi-select {
  //   @include input-wrapper;
  //   min-width: 160px;

  //   .selector {
  //     @include flex;
  //     display: inline-flex;
  //     flex-direction: row;
  //     justify-content: flex-start;
  //     flex-wrap: wrap;
  //     min-height: var(--height, $height);
  //     padding: 0 var(--padding-sm, $padding-sm);

  //     .tag {
  //       display: inline-flex;
  //       align-items: center;
  //       border: 1px solid #dcdcdc;
  //       background: #f5f5f5;
  //       white-space: nowrap;
  //       line-height: calc(var(--height) - 6px);
  //       height: calc(var(--height) - 6px);
  //       border-radius: 2px;
  //       margin: 2px 4px;
  //       margin-left: 0;

  //       label {
  //         display: block;
  //         padding-left: 5px;
  //       }

  //       .icon {
  //         cursor: pointer;
  //         width: 14px;
  //         height: 14px;
  //         padding: 0 var(--padding-xs, $padding-xs);
  //         stroke: #000;
  //       }
  //     }

  //     .input {
  //       width: 3px;

  //       input {
  //         padding: 0;
  //         margin: 0;
  //         width: 100%;
  //       }
  //     }
  //   }

  //   .options {

  //     .option {

  //       &:hover:not(.disabled) {
  //         // color: $theme-color;

  //       }

  //       &.selected {
  //         color: $theme-color;
  //         background: $light-theme-color !important;
  //       }

  //       &.selected:after {
  //         position: absolute;
  //         right: 10px;
  //         top: -2px;
  //         content: "\02143";
  //         transform: rotate(40deg);
  //       }

  //       &.disabled {
  //         cursor: not-allowed !important;
  //         color: rgba(0, 0, 0, 0.25);
  //         background: #f5f5f5;
  //       }
  //     }

  //     .empty {
  //       display: flex;
  //       justify-content: center;
  //       align-items: center;
  //       min-height: $height;
  //     }
  //   }

  //   &.focus {
  //     border: 1px solid $theme-color;
  //     // box-shadow: 0 0 3px 0 rgba(252, 68, 80, 1);
  //   }
  // }
</style>
