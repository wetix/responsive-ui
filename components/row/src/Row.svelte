<script lang="ts">
  let className = "";
  export { className as class };
  export let direction = "";
  export let alignItems = "";
  export let justifyContent = "";
  export let style = "";

  let cssStyle = "";
  if (direction) cssStyle += `flex-direction:${direction}`;
  if (alignItems) cssStyle += `align-items:${alignItems}`;
  if (justifyContent) cssStyle += `justify-content:${justifyContent}`;
</script>

<style lang="scss">
  .responsive-ui-row {
    display: flex;
    flex-wrap: wrap;
    margin: 6px 0;
  }
</style>

<div class="responsive-ui-row {className}" style={cssStyle}>
  <slot />
</div>
