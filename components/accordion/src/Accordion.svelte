<script lang="ts">
  import type { AccordionItem } from "../types";

  let className = "";
  export { className as class };
  export let items: AccordionItem[] = [];
  export let multiple = false;
  export let style = "";

  const id = `accordion-${Math.floor(Math.random() * Date.now())}`;

  let props = { type: "checkbox" };
  if (multiple) props = Object.assign(props, { type: "radio", name: id });
</script>

<div class="responsive-ui-accordion {className}" {style}>
  {#each items as item, i}
    <div class="responsive-ui-accordion__tab">
      <input id="{id}-{i}" {...props} />
      <label class="responsive-ui-accordion__tab-label" for="{id}-{i}"
        >{item.title}</label
      >
      <div class="responsive-ui-accordion__tab-content">
        {#if typeof item.content === "function"}
          <svelte:component this={item.content} />
        {:else}
          <div>{item.content}</div>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .responsive-ui-accordion {
    position: relative;
    overflow: hidden;
    // border-radius: var(--border-radius, 5px);
    // box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.5);

    input {
      position: absolute;
      opacity: 0;
      z-index: -1;
    }

    &__tab {
      width: 100%;
      overflow: hidden;

      &-label {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        color: #1a1b1c;
        font-size: var(--font-size, 14px);
        padding: 5px 10px;
        border-bottom: 1px solid #e1e1e1;
        font-weight: 500;

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
  }
</style>
