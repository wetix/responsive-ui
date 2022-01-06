<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Scroll from "@responsive-ui/hscroll";
</script>

<Meta
  title="Components/Horizontal Scroll"
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

<Template id="nonOverflow" let:args>
  <Scroll {...args} on:click={args.onClick}>
    <span class="slide-item" style="min-height: {args.height}px">1</span>
  </Scroll>
</Template>

<Story name="No overflow" template="nonOverflow" args={{ height: 120 }} />

<style>
  .slide-item {
    display: inline-flex;
    border: 1px solid #dcdcdc;
    width: 120px;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    box-shadow: 1px 1px 5px rgba(255, 0, 0, 0.3);
  }
</style>
