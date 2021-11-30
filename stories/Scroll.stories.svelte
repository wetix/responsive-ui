<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Scroll from "../components/scroll/src/Scroll.svelte";
</script>

<Meta
  title="Components/Scroll"
  component={Scroll}
  argTypes={{
    // placeholder: { control: "text" },
    // disabled: { control: "boolean" },
    // bordered: { control: "boolean" },
    // readonly: { control: "boolean" },
  }}
/>

<Template let:args>
  <Scroll {...args} on:click={args.onClick}>
    {#each new Array(100) as _, index}
      <span
        style="display: inline-flex; border: 1px solid #dcdcdc; width: 120px; justify-content: center; padding: 1rem 0;"
        >{index}</span
      >
    {/each}
  </Scroll>
</Template>

<Story name="Default" args={{}} />
