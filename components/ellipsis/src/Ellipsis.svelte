<script lang="ts">
  let className = "";
  export { className as class };
  export let text = "";
  export let style = "";
</script>

<p class="responsive-ui-ellipsis {className}" {style} on:click>
  <slot>{text}</slot>
</p>

<style lang="scss">
  .responsive-ui-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
