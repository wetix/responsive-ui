<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import FAB from "../components/fab/src/FloatingActionButton.svelte";
</script>

<Meta
  title="Components/Floating Action Button"
  component={FAB}
  argTypes={{
    content: { control: "text" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
    onClick: { action: "onClick" },
  }}
/>

<Template let:args>
  <FAB />
</Template>

<Story
  name="Default"
  args={{
    content: "Hello world!",
  }}
/>
