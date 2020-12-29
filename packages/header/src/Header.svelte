<script lang="ts">
  export let title = "";
  export let style = "";
</script>

<style lang="scss">
  .responsive-ui-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0 10px;

    &__title {
      text-transform: capitalize;
      font-size: 20px;
      font-weight: 600;
      color: #1a1b1c;
    }
  }
</style>

<header class="responsive-ui-header" {style}>
  <span class="responsive-ui-header__title">{title}</span>
  <slot />
</header>
