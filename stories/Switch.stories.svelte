<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Switch from "../components/switch/src/Switch.svelte";
</script>

<Meta
  title="Components/Switch"
  component={Switch}
  argTypes={{
    onChange: { action: "onChange" },
  }}
/>

<Template let:args>
  <Switch {...args} on:change={args.onChange} />
</Template>

<Story name="Default" args={{}} />
