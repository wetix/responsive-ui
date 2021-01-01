<script lang="ts">
  export let style = "";
</script>

<style lang="scss">
  .responsive-ui-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>

<p class="responsive-ui-ellipsis" {style} on:click>
  <slot />
</p>
