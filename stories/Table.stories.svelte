<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Table from "@responsive-ui/table";

  const columns = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age", align: "center" },
    { key: "addressLine1", label: "Address 1" },
    { key: "addressLine2", label: "Address 2" },
  ];

  const data = [
    {
      name: "John Brown",
      age: 12,
      addressLine1: "New York No. 1 Lake Park",
    },
    {
      name: "Jim Green",
      age: 26,
      addressLine1: "New York No. 1 Lake Park, New York No. 1 Lake Park",
      addressLine2: "New York No. 1 Lake Park, New York No. 1 Lake Park",
    },
    {
      name: "Joe Black",
      age: 18,
      addressLine1: "Sidney No. 1 Lake Park",
    },
  ];
</script>

<Meta
  title="Components/Table"
  component={Table}
  argTypes={{
    bordered: { control: "boolean" },
    striped: { control: "boolean" },
    ellipsis: { control: "boolean" },
    loading: { control: "boolean" },
    onClick: { action: "onClick" },
  }}
/>

<Template let:args>
  <Table
    {...args}
    columns={(args.columns || []).map((v) =>
      Object.assign(v, { ellipsis: args.ellipsis })
    )}
    on:click={args.onClick}
  />
</Template>

<Story
  name="Default"
  args={{
    columns,
    items: data,
  }}
/>

<Story
  name="Empty"
  args={{
    columns,
  }}
/>

<Story
  name="Loading"
  args={{
    columns,
    loading: true,
  }}
/>

<Template let:args id="CustomSlot">
  <Table
    {...args}
    columns={(args.columns || []).map((v) =>
      Object.assign(v, { ellipsis: args.ellipsis })
    )}
    on:click={args.onClick}
  >
    <div slot="table-cell" let:columnIndex let:item>
      {#if columnIndex === 0}
        <a href="/" on:click|preventDefault>{item.name}</a>
      {:else if columnIndex === 1}
        <div class="age">{item.age}</div>
      {:else if columnIndex === 2}
        {item.addressLine1}
      {:else if columnIndex === 3}
        {item.addressLine2 ? item.addressLine2 : "-"}
      {/if}
    </div>
  </Table>
</Template>

<Story
  name="Custom Slot"
  args={{
    columns,
    label: "Button",
    items: data,
  }}
  template="CustomSlot"
/>

<style>
  .age {
    display: inline-flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    background: green;
    color: #fff;
    border-radius: 50%;
  }
</style>
