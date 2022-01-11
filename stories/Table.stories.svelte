<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Table from "@responsive-ui/table";

  const columns = [
    {
      key: "name",
      label: "Name",
      sorter: (a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }
    },
    {
      key: "age",
      label: "Age",
      align: "center",
      sorter: (a, b) => a.age - b.age
    },
    { key: "addressLine1", label: "Address 1" },
    { key: "addressLine2", label: "Address 2" }
  ];

  const data = [
    {
      name: "John Brown",
      age: 12,
      addressLine1: "New York No. 1 Lake Park"
    },
    {
      name: "Jim Green",
      age: 26,
      addressLine1: "New York No. 1 Lake Park, New York No. 1 Lake Park",
      addressLine2: "New York No. 1 Lake Park, New York No. 1 Lake Park"
    },
    {
      name: "Joe Black",
      age: 18,
      addressLine1: "Sidney No. 1 Lake Park"
    },
    {
      name: "Adam",
      age: 30,
      addressLine1: "Somewhere"
    },
    {
      name: "Carmen Tan",
      age: 18,
      addressLine1: "Petaling Jaya",
      addressLine2: "Selangor"
    }
  ];
</script>

<Meta
  title="Components/Table"
  component={Table}
  argTypes={{
    bordered: { control: "boolean" },
    striped: { control: "boolean" },
    nowrap: { control: "boolean" },
    loading: { control: "boolean" },
    onClick: { action: "onClick" }
  }}
/>

<Template let:args>
  <Table
    {...args}
    columns={(args.columns || []).map((v) => Object.assign(v, { nowrap: args.nowrap }))}
    on:click={args.onClick}
  />
</Template>

<Story
  name="Default"
  args={{
    columns,
    items: data
  }}
/>

<Story
  name="Empty"
  args={{
    columns
  }}
/>

<Story
  name="Loading"
  args={{
    columns,
    loading: true
  }}
/>

<Template let:args id="CustomSlot">
  <Table
    {...args}
    columns={(args.columns || []).map((v) => Object.assign(v, { nowrap: args.nowrap }))}
    on:click={args.onClick}
  >
    <svelte:fragment slot="table-cell" let:columnIndex let:item>
      {#if columnIndex === 0}
        <a href="/" on:click|preventDefault>{item.name}</a>
      {:else if columnIndex === 1}
        <div class="age">{item.age}</div>
      {:else if columnIndex === 2}
        {item.addressLine1}
      {:else if columnIndex === 3}
        {item.addressLine2 ? item.addressLine2 : "-"}
      {/if}
    </svelte:fragment>
  </Table>
</Template>

<Story
  name="Custom Slot"
  args={{
    columns,
    items: data
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
