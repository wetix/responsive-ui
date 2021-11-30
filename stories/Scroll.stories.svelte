<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Scroll from "../components/scroll/src/Scroll.svelte";
</script>

<Meta
  title="Components/Scroll"
  component={Scroll}
  argTypes={{
    height: { control: { type: "range", min: 100, max: 500, step: 10 } },
    scrollable: { control: "boolean" },
  }}
/>

<Template let:args>
  <Scroll {...args} on:click={args.onClick}>
    {#each new Array(30) as _, index}
      <span class="slide-item" style="min-height: {args.height}px"
        >{index + 1}</span
      >
    {/each}
  </Scroll>
</Template>

<Story name="Default" args={{ height: 120 }} />

<style>
  .slide-item {
    display: inline-flex;
    border: 1px solid #dcdcdc;
    width: 120px;
    justify-content: center;
    align-items: center;
  }
</style>
