<script lang="ts">
  export let type = "",
    backdrop = false;
</script>

<style lang="scss">
  .icon {
    display: inline-block;
    width: 22px;
    height: 22px;
    padding: 2px;

    &.backdrop {
      background: #e1e1e1;
      border-radius: 50%;
    }
  }
</style>

<i class="icon" class:backdrop>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    {#if type === 'close'}
      <line
        x1="368"
        y1="368"
        x2="144"
        y2="144"
        style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
      <line
        x1="368"
        y1="144"
        x2="144"
        y2="368"
        style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
    {:else}
      <svg />
    {/if}
  </svg>
</i>
