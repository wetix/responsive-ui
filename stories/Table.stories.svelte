<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Table from "../components/table/src/Table.svelte";
</script>

<Meta
  title="Components/Table"
  component={Table}
  argTypes={{
    label: { control: "text" },
    disabled: { control: "boolean" },
    bordered: { control: "boolean" },
    onClick: { action: "onClick" },
  }}
/>

<Template let:args>
  <Table
    {...args}
    columns={[{ key: "status", label: "Status" }]}
    on:click={args.onClick}
  >
    {args.label}
  </Table>
</Template>

<Story
  name="Default"
  args={{
    label: "Button",
  }}
/>
