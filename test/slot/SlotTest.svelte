<script type="ts">
  import { SvelteComponent } from "svelte";

  export let component: SvelteComponent;
  export let props: Record<string, unknown> = {};
</script>

<svelte:component this={component} {...props}>
  <h1 data-testid="slot">Test Data</h1>
</svelte:component>
