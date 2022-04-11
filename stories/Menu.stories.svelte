<script lang="ts">
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Menu from "@responsive-ui/menu";

  const options = [
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

  let open = false;
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
    },
    align: {
      control: { type: "select", options: ["left", "right", "center"] }
    }
  }}
/>

<Template let:args>
  <Menu {options} {...args} bind:open>
    <div on:click|stopPropagation={() => (open = !open)}>Click me</div>
  </Menu>
</Template>

<Story name="Default" args={{ align: "right" }} />
