<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Row from "@responsive-ui/row";
  import Column from "@responsive-ui/column";
</script>

<Meta
  title="Components/Layout"
  argTypes={{
    content: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    bordered: { control: "boolean" },
    // readonly: { control: "boolean" },
  }}
/>

<Template let:args>
  <Row>
    <Column sm={24} md={6}>A</Column>
    <Column sm={24} md={6}>B</Column>
    <Column sm={24} md={6}>C</Column>
    <Column sm={24} md={6}>D</Column>
  </Row>
</Template>

<Story
  name="Default"
  args={{
    variant: "medium",
    placeholder: "Input your text...",
  }}
/>
