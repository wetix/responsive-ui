<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Sidebar from "@responsive-ui/sidebar";
</script>

<Meta
  title="Components/Sidebar"
  component={Sidebar}
  argTypes={{
    side: { type: "select", options: ["left", "right"] },
    top: { control: "text" },
    open: { control: "boolean" }
  }}
/>

<Template let:args>
  <Sidebar {...args}>
    <div>Test Sidebar Content</div>
  </Sidebar>
</Template>

<Story name="Default" />
