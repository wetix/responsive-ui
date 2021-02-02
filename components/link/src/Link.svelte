<script lang="ts">
  let className = "";
  export { className as class };
  export let title = "";
  export let href = "javascript:void(0)";
  export let style = "";
</script>

<a class="responsive-ui-link {className}" {title} {href} on:click {style}
  ><slot /></a
>

<style lang="scss">
  .responsive-ui-link {
    display: inline-block;
    vertical-align: middle;
    // color: var(--color-text-primary, #3b3b3b);
    color: var(--color-text-link, #0366d6);

    &:hover {
      // color: var(--color-text-link, #0366d6);
      text-decoration: underline;
    }
  }
</style>
