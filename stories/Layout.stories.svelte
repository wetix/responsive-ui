<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Row from "@responsive-ui/row";
  import Column from "@responsive-ui/column";
</script>

<Meta title="Components/Layout" argTypes={{}} />

<Template let:args>
  <Row>
    <Column sm={24} md={24} lg={4}>
      <div class="blue">Span (sm:24, md:24, lg:4)</div></Column
    >
    <Column sm={24} md={24} lg={4}>
      <div class="light-blue">Span (sm:24, md:24, lg:4)</div></Column
    >
    <Column sm={24} md={6} lg={4}>
      <div class="blue">Span (sm:24, md:6, lg:4)</div></Column
    >
    <Column sm={24} md={6} lg={4}>
      <div class="light-blue">Span (sm:24, md:6, lg:4)</div></Column
    >
  </Row>
  <Row justifyContent="flex-start">
    <Column sm={6} md={24} lg={4}>
      <div class="blue">Span (sm:6, md:24, lg:4)</div></Column
    >
    <Column sm={6} md={24} lg={4}>
      <div class="light-blue">Span (sm:6, md:24, lg:4)</div></Column
    >
    <Column sm={6} md={6} lg={4}>
      <div class="blue">Span (sm:6, md:6, lg:4)</div></Column
    >
    <Column sm={6} md={6} lg={4}>
      <div class="light-blue">Span (sm:6, md:6, lg:4)</div></Column
    >
  </Row>
</Template>

<Story
  name="Default"
  args={{
    variant: "medium",
    placeholder: "Input your text...",
  }}
/>

<style>
  .blue {
    display: flex;
    min-height: 60px;
    align-items: center;
    color: #fff;
    justify-content: center;
    background: #4287f5;
  }

  .light-blue {
    display: flex;
    min-height: 60px;
    align-items: center;
    color: #fff;
    justify-content: center;
    background: #5993f0;
  }
</style>
