<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import AppBar from "../components/app-bar/src/AppBar.svelte";
</script>

<Meta title="Components/AppBar" component={AppBar} argTypes={{}} />

<Template let:args>
  <AppBar />
</Template>

<Story
  name="Default"
  args={{
    label: "AppBar",
  }}
/>
