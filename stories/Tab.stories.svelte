<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Tab from "@responsive-ui/tab";

  const items = [
    {
      label: "Section A"
    },
    {
      label: "Section B"
    },
    {
      label: "Section C"
    },
    {
      label: "Section D"
    }
  ];
</script>

<Meta
  title="Components/Tab"
  component={Tab}
  argTypes={{
    disabled: { control: "boolean" },
    checked: { control: "boolean" }
  }}
/>

<Template let:args>
  <Tab {items} {...args}>
    <svelte:fragment>
      <div>A</div>
      <div>B</div>
      <div>C</div>
    </svelte:fragment>
  </Tab>
</Template>

<Story name="Default" />
