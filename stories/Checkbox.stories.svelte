<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Checkbox from "../components/checkbox/src/Checkbox.svelte";
</script>

<Meta
  title="Components/Checkbox"
  component={Checkbox}
  argTypes={{
    content: { control: "text" },
    onClick: { action: "onClick" },
  }}
/>

<Template let:args>
  <Checkbox {...args} on:click={args.onClick} />
</Template>

<Story name="Default" args={{}} />
