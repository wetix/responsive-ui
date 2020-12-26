<script lang="ts">
  import { onDestroy } from "svelte";
  import type { SvelteComponent } from "svelte";

  import Calendar from "./Calendar.svelte";

  const today = new Date();

  export let name = "";
  export let readonly = false;
  export let disabled = false;
  export let format = (v: string) => "";
  export let value = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  export let placeholder = "";

  console.log(value);

  let calendar: null | SvelteComponent;
  const handleToggle = (e: Event) => {
    const rect = (e.target as HTMLInputElement).getBoundingClientRect();
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
      calendar.$set({
        style: `top:${rect.top + rect.height + 10}px;left:${rect.left}px;`,
        visible: true,
        value,
      });
    } else {
      calendar.$set({ visible: !calendar.visible });
    }
  };

  onDestroy(() => {
    calendar && calendar.$destroy();
  });
</script>

<style lang="scss">
  .responsive-ui-date-picker {
    width: 100%;

    // &--icon-calendar {
    //   width: 20px;
    //   height: 20px;
    // }

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

<div class="responsive-ui-date-picker" on:click={handleToggle}>
  <div class="responsive-ui-date-picker__wrapper">
    <div class="responsive-ui-date-picker__input">
      <!-- <div style="position:absolute;top:0;bottom:0;left:0;padding:7px 10px;">
          <svg
            class="responsive-ui-date-picker--icon-calendar"
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
        {value}
        on:change
        on:blur />
    </div>
  </div>
</div>
