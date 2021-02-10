<script lang="ts">
  let className = "";
  export { className as class };
  export let count = 100;
  export let max = 99;
</script>

<span
  {...$$restProps}
  class="responsive-ui-badge {className}"
  data-count={count > max ? `${max}+` : count}
>
  <slot />
</span>

<style lang="scss">
  .responsive-ui-badge {
    position: relative;
    display: inline-block;
    vertical-align: middle;

    &:not([data-count="0"]):after {
      content: attr(data-count);
      position: absolute;
      color: #fff;
      border: 2px solid #fff;
      display: block;
      font-size: var(--font-size-xs, 10px);
      font-family: Helvetica;
      height: 9px;
      background-color: var(--primary-color, #fc4451);
      line-height: 9px;
      min-width: 9px;
      padding: 4px;
      right: -9px;
      text-align: center;
      top: -9px;
      border-radius: 10px;
      z-index: 1;
    }

    // &[data-count="0"] {
    //   &:after {
    //     display: none;
    //   }
    // }
  }
</style>
