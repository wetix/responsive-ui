<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Responsive from "@responsive-ui/responsive";
</script>

<Meta title="Components/Responsive" component={Responsive} />

<Template>
  <Responsive let:aspectRatio let:innerWidth let:orientation>
    <div>Aspect Ratio: {aspectRatio}</div>
    <div>Inner Width: {innerWidth}</div>
    <div>Orientation: {orientation}</div>
  </Responsive>
</Template>

<Story name="Default" />
