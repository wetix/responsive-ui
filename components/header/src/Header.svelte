<script lang="ts">
  let className = "";
  export { className as class };
  export let label = "";
</script>

<header class="resp-header {className}" {...$$restProps}>
  <span class="resp-header__label">{label}</span>
  <slot />
</header>

<style lang="scss" global>
  .resp-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--padding) 0;

    &__label {
      text-transform: capitalize;
      font-size: var(--font-size-header, 20px);
      font-weight: 600;
      color: #1a1b1c;
    }
  }
</style>
