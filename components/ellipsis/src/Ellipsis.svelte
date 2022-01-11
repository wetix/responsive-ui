<script lang="ts">
  let className = "";
  export { className as class };
  export let width = "100%";
  export let style = "";
</script>

<div
  class="resp-ellipsis {className}"
  {...$$restProps}
  style={`width: ${width}; ${style}`}
  on:click>
  <slot />
</div>

<style lang="scss" global>
  .resp-ellipsis {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
