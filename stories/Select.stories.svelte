<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Select from "../components/select/src/Select.svelte";
</script>

<Meta
  title="Components/Select"
  component={Select}
  argTypes={{
    content: { control: "text" },
    onClick: { action: "onClick" },
  }}
/>

<Template let:args>
  <Select
    {...args}
    options={[
      { label: "Option A", value: "a" },
      { label: "Option B", value: "b" },
      { label: "Option C", value: "c" },
    ]}
    on:click={args.onClick}
  />
</Template>

<Story name="Default" args={{}} />
