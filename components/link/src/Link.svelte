<script lang="ts">
  export let title = "";
  export let href = "";
</script>

<style lang="scss">
  .responsive-ui-link {
    color: var(--color-text-primary, #3b3b3b);

    &:hover {
      color: var(--color-text-link, #0366d6);
      text-decoration: underline;
    }
  }
</style>

<a class="responsive-ui-link" {title} {href}><slot /></a>
