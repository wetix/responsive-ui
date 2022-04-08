<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let label = "";
  export let outline = false;
  export let closable = false;
  export let color = "default";

  const handleClose = () => {
    dispatch("close");
  };
</script>

<span
  class="resp-tag resp-tag--{color} {className}"
  class:resp-tag--outline={outline}
  {...$$restProps}
>
  <slot>{label}</slot>
  {#if closable}
    <span class="resp-tag__close" on:click={handleClose}>&#10005;</span>
  {/if}
</span>

<style lang="scss" global>
  .resp-tag {
    position: relative;
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: center;
    font-size: var(--font-size-sm, 12px);
    color: #817e7e;
    padding: 1px 5px;
    border-radius: 3px;
    border: 1px solid #817e7e;
    overflow: hidden;

    @media (max-width: 768px) {
      font-size: var(--font-size-xs, 10px);
    }

    &__close {
      cursor: pointer;
      margin-left: 5px;
    }

    &--blue {
      border-color: rgba(190, 227, 248, 1);
      color: rgba(49, 130, 206, 1);
      background: rgba(190, 227, 248, 1);
    }

    &--red {
      color: rgba(185, 28, 28, 1);
      background: rgba(254, 202, 202, 1);
    }

    &--green {
      color: rgba(4, 120, 87, 1);
      background: rgba(167, 243, 208, 1);
    }

    &--teal {
      color: rgba(49, 151, 149, 1);
      background: rgba(178, 245, 234, 1);
    }

    &--orange {
      color: rgba(221, 107, 32, 1);
      background: rgba(254, 235, 200, 1);
    }

    &--yellow {
      color: rgba(180, 83, 9, 1);
      background: rgba(253, 230, 138, 1);
    }

    &--purple {
      color: rgba(128, 90, 213, 1);
      background: rgba(233, 216, 253, 1);
    }

    &--pink {
      color: rgba(213, 63, 140, 1);
      background: rgba(254, 215, 226, 1);
    }

    &--grey {
      color: rgba(113, 128, 150, 1);
      background: rgba(237, 242, 247, 1);
    }

    &--outline {
      background: inherit;
    }
  }
</style>
