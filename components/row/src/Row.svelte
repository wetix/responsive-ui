<script lang="ts">
  let className = "";
  export { className as class };
  export let justifyContent = "space-between";
  export let style = "";
</script>

<div
  class="resp-row {className}"
  style="justify-content: {justifyContent}; {style}"
  {...$$restProps}
>
  <slot />
</div>

<style lang="scss">
  .resp-row {
    display: flex;
    flex-direction: row;
    row-gap: 0;
  }
</style>
