<script lang="ts">
  let className = "";
  export { className as class };
  export let title = "";
  export let href = "#";
  export let style = "";
</script>

<a class="responsive-ui-link {className}" {title} {href} on:click {style}
  ><slot /></a
>

<style lang="scss">
  .responsive-ui-link {
    // color: var(--color-text-primary, #3b3b3b);
    color: var(--color-text-link, #0366d6);

    &:hover {
      // color: var(--color-text-link, #0366d6);
      text-decoration: underline;
    }
  }
</style>
