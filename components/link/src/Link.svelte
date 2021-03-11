<script lang="ts">
  let className = "";
  export { className as class };
  export let label = "";
  export let href = "javascript:void(0)";
</script>

<a
  {...$$restProps}
  class="responsive-ui-link {className}"
  aria-label={label}
  {href}
  on:click><slot /></a
>

<style lang="scss">
  .responsive-ui-link {
    display: inline-block;
    vertical-align: middle;
    color: var(--color-text-link, #0366d6);

    &:hover {
      text-decoration: underline;
    }
  }
</style>
