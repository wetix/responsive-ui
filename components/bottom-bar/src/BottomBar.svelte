<script lang="ts">
  let className = "";
  export { className as class };
</script>

<div class="resp-bottom-bar {className}" {...$$restProps}>
  <div class="resp-bottom-bar__box">
    <slot />
  </div>
</div>

<style lang="scss" global>
  .resp-bottom-bar {
    box-shadow: 0px -1px 26px rgba(0, 0, 0, 0.1);
    position: fixed;
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    right: 0;
    background: inherit;
    padding-bottom: env(safe-area-inset-bottom, 15px);
    z-index: 50;

    &__box {
      padding: 12px 15px;
    }
  }
</style>
