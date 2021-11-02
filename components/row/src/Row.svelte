<script lang="ts">
  let className = "";
  export { className as class };
  export let direction = "";
  export let alignItems = "";
  export let justifyContent = "";

  let cssStyle = "";
  if (direction) cssStyle += `flex-direction: ${direction}`;
  if (alignItems) cssStyle += `align-items: ${alignItems}`;
  if (justifyContent) cssStyle += `justify-content: ${justifyContent}`;
</script>

<div {...$$restProps} class="resp-row {className}" style={cssStyle}>
  <slot />
</div>

<style lang="scss">
  .resp-row {
    display: flex;
    flex-wrap: wrap;
    margin: 6px 0;
  }
</style>
