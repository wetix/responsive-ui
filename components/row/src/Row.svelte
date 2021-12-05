<script lang="ts">
  let className = "";
  export { className as class };
  export let justifyContent = "space-between";
  export let alignItems = "flex-start";
  export let nowrap = false;
  export let style = "";
</script>

<div
  class="resp-row {className}"
  class:resp-row--nowrap={nowrap}
  style="justify-content: {justifyContent}; align-items: {alignItems}; {style}"
  {...$$restProps}
>
  <slot />
</div>

<style lang="scss" global>
  .resp-row {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    row-gap: 0;

    &--nowrap {
      flex-wrap: nowrap;
    }
    @media (min-width: 576px) {
      flex-direction: row;
    }
  }
</style>
