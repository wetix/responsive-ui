<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let label = "";
  export let value = "";
  export let nowrap = false;
  export let disabled = false;
  export let checked = false;

  const onClick = () => {
    checked = !checked;
    dispatch("change", { checked, value });
  };
</script>

<div
  class="resp-action-sheet__option"
  class:resp-action-sheet__option--checked={checked}
  class:resp-action-sheet__option--disabled={disabled}
  on:click={disabled ? undefined : onClick}
>
  <span
    class="resp-action-sheet__option-label"
    class:resp-action-sheet__option-label--nowrap={nowrap}>{label}</span
  >
</div>

<style lang="scss">
  .resp-action-sheet-option {
    cursor: pointer;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    position: relative;
    align-items: center;
    padding: 6px 0;
    text-transform: capitalize;
    color: var(--text-color-black, #505050);

    &:last-child {
      border: 0;
    }

    &--checked:after {
      position: absolute;
      right: 6px;
      top: -2px;
      font-size: 20px;
      content: "\02143";
      transform: rotate(40deg);
    }

    &--disabled {
      cursor: not-allowed;
      opacity: 0.65;

      &:after {
        position: absolute;
        content: "";
        top: calc(50% - 1px);
        right: 0;
        left: 0;
        height: 1px;
        background: #3b3b3b;
      }
    }

    &__icon {
      vertical-align: middle;
      margin-right: 8px;
    }

    &__label {
      box-sizing: border-box;
      font-size: var(--font-size, 14px);
      padding-right: 24px;

      &--nowrap {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
