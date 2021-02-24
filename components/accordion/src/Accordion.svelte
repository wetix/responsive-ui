<script lang="ts">
  import type { AccordionItem } from "../types";

  let className = "";
  export { className as class };
  export let items: AccordionItem[] = [];
  export let multiple = false;
  export let style = "";

  const id = `acd-${Math.floor(Math.random() * Date.now())}`;

  let props = { type: "checkbox" };
  if (!multiple) props = Object.assign(props, { type: "radio", name: id });
</script>

<div class="responsive-ui-accordion {className}" {style}>
  {#each items as item, i}
    <div class="responsive-ui-accordion__tab">
      <input
        id="{id}-{i}"
        {...props}
        checked={item.collapsed === false ? true : false}
        disabled={item.disabled}
      />
      <label class="responsive-ui-accordion__tab-label" for="{id}-{i}">
        <slot name="label" index={i}>{item.label}</slot>
      </label>
      <div class="responsive-ui-accordion__tab-content">
        <slot name="tab" index={i}>
          {#if typeof item.content === "function"}
            <svelte:component this={item.content} />
          {:else}
            {item.content}
          {/if}
        </slot>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .responsive-ui-accordion {
    position: relative;
    overflow: hidden;

    input {
      position: absolute;
      opacity: 0;
      z-index: -1;
    }

    &__tab {
      width: 100%;
      overflow: hidden;

      &-label {
        position: relative;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        color: #1a1b1c;
        font-size: var(--font-size, 14px);
        padding: 5px 10px;
        padding-right: 28px;
        border-bottom: 1px solid #e1e1e1;
        font-weight: 500;

        &:after {
          content: "";
          position: absolute;
          top: calc(50% - 4px);
          right: 10px;
          border: solid black;
          border-width: 0 1px 1px 0;
          display: inline-block;
          padding: 4px;
          transition: all 0.3s;
          transform-origin: 50% 50%;
          transform: rotate(225deg);
          -webkit-transform: rotate(225deg);
        }

        &:hover {
          background: #f5f5f5;
        }
      }

      &-content {
        height: 0;
        padding: 0 10px;
        background: #fff;
        transition: all 0.5s;
      }
    }

    input:checked {
      ~ .responsive-ui-accordion__tab-content {
        height: auto;
        padding: 10px;
      }
    }

    input:checked {
      ~ .responsive-ui-accordion__tab-label:after {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
      }
    }

    input:disabled {
      ~ .responsive-ui-accordion__tab-label {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
</style>
