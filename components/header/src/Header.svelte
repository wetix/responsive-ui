<script lang="ts">
  let className = "";
  export { className as class };
  export let label = "";
  export let style = "";
</script>

<header class="responsive-ui-header {className}" {style}>
  <span class="responsive-ui-header__label">{label}</span>
  <slot />
</header>

<style lang="scss">
  .responsive-ui-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0 10px;

    &__label {
      text-transform: capitalize;
      font-size: var(--font-size-lg, 20px);
      font-weight: 600;
      color: #1a1b1c;
    }
  }
</style>
