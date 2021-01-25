<script lang="ts">
  let forName = "";
  let className = "";
  export { forName as for };
  export { className as class };
  export let title = "";
  export let form = "";
  export let style = "";
</script>

<label class="responsive-ui-label {className}" for={forName} {form} {style}>
  <slot>{title}</slot>
</label>
<slot />

<style lang="scss">
  .responsive-ui-label {
    display: block;
    padding: 6px 0;
    margin: 0;
    color: var(--text-color, #3b3b3b);
  }
</style>
