<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Switch from "@responsive-ui/switch";
</script>

<Meta
  title="Components/Switch"
  component={Switch}
  argTypes={{
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  }}
/>

<Template let:args>
  <Switch {...args} on:click={args.onClick} />
</Template>

<Story name="Default" />
