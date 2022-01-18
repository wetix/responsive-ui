<script type="ts">
  export let component: any;
  export let props: {};
</script>

<svelte:component this={component} {...props}>
  <h1 data-testid="slot">Test Data</h1>
</svelte:component>
