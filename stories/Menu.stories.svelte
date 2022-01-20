<script lang="ts">
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Menu from "@responsive-ui/menu";

  const items = [
    {
      label: "A"
    },
    {
      label: "B"
    },
    {
      label: "C"
    },
    {
      label: "D"
    }
  ];
</script>

<Meta
  title="Components/Menu"
  component={Menu}
  argTypes={{
    fit: {
      control: { type: "select", options: ["none", "viewport"] }
    },
    size: {
      control: { type: "select", options: ["small", "default", "large"] }
    }
  }}
/>

<Template let:args>
  <Menu {items} {...args} />
</Template>

<Story name="Default" />
