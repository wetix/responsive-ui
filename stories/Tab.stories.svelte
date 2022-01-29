<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Tab from "@responsive-ui/tab";

  const items = [
    {
      key: "A",
      label: "Section A"
    },
    {
      key: "B",
      label: "Section B"
    },
    { key: "C", label: "Section C" },
    {
      key: "D",
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
  <Tab selectedKey="B" {items} {...args}>
    <svelte:fragment let:item>
      <div class="item">
        {#if item.key == "A"}
          A
        {:else if item.key == "B"}
          B
        {:else if item.key == "C"}
          C
        {:else if item.key == "D"}
          D
        {/if}
      </div>
    </svelte:fragment>
  </Tab>
</Template>

<Story name="Default" />

<style lang="scss">
  .item {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
