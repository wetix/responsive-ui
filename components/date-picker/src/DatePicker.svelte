<script context="module" lang="ts">
  const queue: string[] = [];
  window.addEventListener("click", (e) => {
    console.log(queue);
  });
</script>

<script lang="ts">
  import { onMount, onDestroy, SvelteComponentTyped } from "svelte";
  import type { SvelteComponent } from "svelte";

  import Calendar from "./Calendar.svelte";

  const today = new Date();

  let className = "";
  export { className as class };
  export let ref: null | HTMLInputElement = null;
  export let name = "";
  export let readonly = false;
  export let disabled = false;
  export let value = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  export let placeholder = "";

  let calendar: null | SvelteComponent;
  onMount(() => {
    // queue.push([datepicker]);
  });

  const handleToggle = (e: Event) => {
    const rect = (<HTMLInputElement>e.currentTarget).getBoundingClientRect();
    // const { top, bottom } = getAbsoluteBoundingRect(e.currentTarget);
    if (!calendar) {
      calendar = new Calendar({
        target: document.body,
        props: {
          value,
        },
      });
      calendar.$on("change", ({ detail }: CustomEvent<string>) => {
        value = detail;
        setTimeout(() => {
          (<SvelteComponentTyped>calendar).$set({ visible: false });
        }, 200);
      });
    }

    calendar.$set({
      style: `top:${rect.top + 10}px;left:${rect.left}px;`,
      visible: !calendar.visible,
      value,
    });
  };

  onDestroy(() => {
    calendar && calendar.$destroy();
  });
</script>

<div class="responsive-ui-date {className}" on:click={handleToggle}>
  <div class="responsive-ui-date__wrapper">
    <div class="responsive-ui-date__input">
      <input
        bind:this={ref}
        type="date"
        {name}
        {disabled}
        {placeholder}
        {readonly}
        {value}
        on:change
        on:blur
      />
    </div>
  </div>
</div>

<style lang="scss">
  .responsive-ui-date {
    width: 100%;

    &__wrapper {
      position: relative;
    }

    &__input {
      border-radius: var(--border-radius, 5px);
      position: relative;
      overflow: hidden;

      input[type="date"] {
        display: block;
        border: none;
        background: #f1f1f1;
        width: 100%;
        height: var(--height, 34px);
        line-height: var(--height, 34px);
        margin: 0;
        padding: 0 10px;
        appearance: none;
        font-size: var(--font-size, 14px);
        font-family: var(--font-family, inherit);
        outline: none;
        text-transform: none;
        box-sizing: border-box;
      }
    }
  }
</style>
