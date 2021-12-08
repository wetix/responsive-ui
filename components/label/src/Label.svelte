<script lang="ts">
  let forName = "";
  let className = "";
  export { forName as for };
  export { className as class };
  export let label = "";
</script>

<label class="resp-label {className}" for={forName} {...$$restProps}>
  {label}
</label>
<slot />

<style lang="scss">
  .resp-label {
    display: block;
    padding: 1rem 0 0.5rem;
    margin: 0;
    color: var(--text-color, #3b3b3b);
  }
</style>
