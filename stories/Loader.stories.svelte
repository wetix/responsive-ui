<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Loader from "../components/loader/src/Loader.svelte";
</script>

<Meta
  title="Components/Loader"
  component={Loader}
  argTypes={{
    fit: {
      control: { type: "select", options: ["none", "viewport"] },
    },
    size: {
      control: { type: "select", options: ["small", "default", "large"] },
    },
  }}
/>

<Template let:args>
  <Loader {...args} />
</Template>

<Story name="Default" />
