<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { CheckboxOptions } from "../types";

  let id = 0;

  export let options: CheckboxOptions[] = [];
  export let value: (string | number)[] = [];

  const dispatch = createEventDispatcher();

  const isChecked = (v: string | number): boolean => {
    return value.indexOf(v) >= 0;
  };

  const handleOnChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const index = value.indexOf(target.value);
    if (target.checked) {
      if (index < 0) {
        value = value.concat(target.value);
      }
    } else {
      if (index >= 0) {
        value.splice(index, 1);
        value = value;
      }
    }
    dispatch("change", {
      value,
    });
  };
</script>

{#each options as { label, value, disabled }}
  <label class="bounce" class:disabled>
    <span class="responsive-ui-checkbox">
      <input
        type="checkbox"
        on:change={handleOnChange}
        {disabled}
        {value}
        checked={isChecked(value)}
      />
      <svg viewBox="0 0 21 21">
        <polyline points="5 10.75 8.5 14.25 16 6" />
      </svg>
    </span>
    <caption>
      {label}
    </caption>
  </label>
{/each}

<style lang="scss">
  label {
    position: relative;
    display: flex;
    align-items: center;

    .responsive-ui-checkbox {
      position: relative;
    }

    caption {
      margin-left: 10px;
    }

    input,
    svg {
      width: 16px;
      height: 16px;
      display: block;
    }
    input {
      position: relative;
      outline: none;
      background: #fff;
      border: none;
      margin: 0;
      padding: 0;
      cursor: pointer;
      border-radius: 3px;
      transition: box-shadow 0.3s;
      appearance: none;
      background: #ddd;
      box-shadow: inset 0 0 0 2px #ccc;

      &:disabled {
        opacity: 0.6;
      }

      // &:hover:not(:disabled),
      // &:checked:not(:disabled) {
      //   box-shadow: inset 0 0 0 1px #fc4451;
      // }
    }
    svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 16px;
      height: 16px;
      pointer-events: none;
      fill: none;
      stroke-width: 2px;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke: #ddd;
      transform: scale(1) translateZ(0);
    }
    //&.path {
    //  input {
    //    &:checked {
    //      transition-delay: 0.4s;
    //    }
    //  }
    //  svg {
    //    stroke-dasharray: 86.12;
    //    stroke-dashoffset: 86.12;
    //    transition: stroke-dasharray 0.6s, stroke-dashoffset 0.6s;
    //  }
    //}

    &.bounce {
      input {
        &:checked {
          box-shadow: inset 0 0 0 11px #fc4451;
          & + svg {
            animation: bounce 0.4s linear forwards 0.2s;
          }
        }
      }
    }
  }

  @keyframes bounce {
    50% {
      transform: scale(1.2);
    }
    75% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
