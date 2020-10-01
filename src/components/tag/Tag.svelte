<script lang="ts">
  export let color = "grey";
</script>

<style lang="scss">
  .tag {
    display: inline-block;
    // border: 1px solid red;
    vertical-align: middle;
    padding: 2px 8px;
    // height: 20px;
    max-width: 200px;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 5px;
    text-transform: capitalize;
    background: #74d68d;
    color: #216e35;

    &.failed {
    }
  }
</style>

<span class={`tag ${color}`}>
  <slot />
</span>
