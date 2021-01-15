<script context="module" lang="ts">
  const queue = [];
  window.addEventListener("click", (e) => {
    console.log(queue);
  });
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import type { SvelteComponent } from "svelte";

  import Calendar from "./Calendar.svelte";

  const today = new Date();

  export let name = "";
  export let readonly = false;
  export let disabled = false;
  export let value = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  export let placeholder = "";

  let datepicker: null | HTMLDivElement;
  let calendar: null | SvelteComponent;
  onMount(() => {
    queue.push([datepicker]);
  });

  function getAbsoluteBoundingRect(el) {
    var doc = document,
      win = window,
      body = doc.body,
      // pageXOffset and pageYOffset work everywhere except IE <9.
      offsetX =
        win.pageXOffset !== undefined
          ? win.pageXOffset
          : (doc.documentElement || body.parentNode || body).scrollLeft,
      offsetY =
        win.pageYOffset !== undefined
          ? win.pageYOffset
          : (doc.documentElement || body.parentNode || body).scrollTop,
      rect = el.getBoundingClientRect();

    let target;
    console.log(rect);
    if (el !== body) {
      var parent = el.parentNode;

      // The element's rect will be affected by the scroll positions of
      // *all* of its scrollable parents, not just the window, so we have
      // to walk up the tree and collect every scroll offset. Good times.
      while (parent !== body) {
        console.log(
          parent,
          parent.scrollTop,
          window.getComputedStyle(parent).getPropertyValue("position")
        );

        const position = window
          .getComputedStyle(parent)
          .getPropertyValue("position");

        offsetX += parent.scrollLeft;
        offsetY += parent.scrollTop;
        if (!target && position !== "relative") {
          console.log("parent rect =>", parent.getBoundingClientRect());
          target = parent;
          // break;
        }
        parent = parent.parentNode;
      }
    }

    return {
      target,
      bottom: rect.bottom + offsetY,
      height: rect.height,
      left: rect.left + offsetX,
      right: rect.right + offsetX,
      top: rect.top + offsetY,
      width: rect.width,
    };
  }

  const handleToggle = (e: Event) => {
    const rect = (e.currentTarget as HTMLInputElement).getBoundingClientRect();
    const { top, bottom } = getAbsoluteBoundingRect(e.currentTarget);
    if (!calendar) {
      calendar = new Calendar({
        target: document.body,
        props: {
          value,
        },
      });
      calendar.$on("change", ({ detail }: { detail: string }) => {
        value = detail;
        setTimeout(() => {
          calendar.$set({ visible: false });
        }, 200);
      });
    }

    calendar.$set({
      style: `top:${bottom + 10}px;left:${rect.left}px;`,
      visible: !calendar.visible,
      value,
    });
  };

  onDestroy(() => {
    calendar && calendar.$destroy();
  });
</script>

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

      input {
        display: block;
        border: none;
        background: #f1f1f1;
        width: 100%;
        height: 36px;
        line-height: 36px;
        padding: 0 8px;
        appearance: none;
        outline: none;
        text-align: left;
        text-transform: none;
        margin: 0;
        font-size: inherit;
        box-sizing: border-box;
      }
    }
  }
</style>

<div bind:this={datepicker} class="responsive-ui-date" on:click={handleToggle}>
  <div class="responsive-ui-date__wrapper">
    <div class="responsive-ui-date__input">
      <!-- <div style="position:absolute;top:0;bottom:0;left:0;padding:7px 10px;">
          <svg
            class="responsive-ui-date--icon-calendar"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2" />
          </svg>
        </div> -->
      <input
        type="date"
        {name}
        {disabled}
        {placeholder}
        {readonly}
        {value}
        on:change
        on:blur />
    </div>
  </div>
</div>
