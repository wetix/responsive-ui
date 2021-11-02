<script lang="ts">
  let className = "";
  export { className as class };
  export let label = "";
</script>

<header {...$$restProps} class="resp-header {className}">
  <span class="resp-header__label">{label}</span>
  <slot />
</header>

<style lang="scss">
  .resp-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: var(--padding) 0;

    &__label {
      text-transform: capitalize;
      font-size: var(--font-size-lg);
      font-weight: 600;
      color: #1a1b1c;
    }
  }
</style>
