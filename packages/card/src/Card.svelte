<style lang="scss">
  .responsive-ui-card {
    word-break: break-word;
    padding: 10px;
    margin-bottom: 15px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    overflow: hidden;
  }
</style>

<div class="responsive-ui-card" on:click>
  <slot />
</div>
