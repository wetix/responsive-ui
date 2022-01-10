<script type="ts">
  export let Component: any;
  export let props: {};
</script>

<svelte:component this={Component} {...props}>
  <h1 data-testid="slot">Test Data</h1>
</svelte:component>
