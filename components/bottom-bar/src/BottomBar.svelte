<script lang="ts">
  let className = "";
  export { className as class };
  export let style = "";
</script>

<style lang="scss">
  .responsive-ui-bottom-bar {
    box-shadow: 0px -1px 26px rgba(0, 0, 0, 0.1);
    width: 100%;
    position: fixed;
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    background: white;
    padding-bottom: env(safe-area-inset-bottom, 10px);
    z-index: 50;

    &__wrapper {
      padding: 12px 15px;
    }
  }
</style>

<div class="responsive-ui-bottom-bar {className}" {style}>
  <div class="responsive-ui-bottom-bar__wrapper">
    <slot />
  </div>
</div>
