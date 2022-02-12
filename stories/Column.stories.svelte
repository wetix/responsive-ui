<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import Row from "@responsive-ui/row";
  import Column from "@responsive-ui/column";

  const lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu malesuada nisi, at finibus est. Etiam congue, odio interdum cursus dictum, orci enim fringilla risus, quis tempor quam arcu sed nulla. Nulla vehicula dolor a ex egestas bibendum et sollicitudin erat. Suspendisse ultrices neque vel rhoncus aliquam. Nam aliquet, diam vel laoreet consequat, velit diam tristique nunc, nec aliquam justo odio semper enim. Morbi vel nulla lacinia, placerat turpis nec, efficitur nibh. Sed convallis commodo elit, eget auctor urna dapibus nec. Cras lobortis ut augue ac gravida. Curabitur placerat ornare nisi non rutrum. Quisque quis bibendum nunc. Nunc bibendum felis ipsum, sed molestie elit molestie ut. Suspendisse faucibus dui et dui mattis hendrerit. Aliquam nec risus eget ligula fringilla venenatis.`;
  const lipsum2 = `Sed commodo dapibus metus quis varius. Etiam porta finibus ligula pulvinar luctus. Aenean congue nunc eu imperdiet hendrerit. Morbi quis sagittis turpis. Vestibulum ut ante at odio egestas ultricies. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In varius luctus nulla, eget lacinia tortor tempus eu. Ut suscipit at massa sed facilisis. Mauris dapibus metus vel nisl maximus, at congue turpis egestas. Donec et maximus massa, ut malesuada tellus. Nam auctor quam non neque interdum sollicitudin. Mauris mi purus, scelerisque nec lectus eu, consectetur lacinia enim. Sed at volutpat erat, non egestas sem. Cras id nunc at purus cursus malesuada et in tellus. Curabitur pharetra, risus ut egestas sollicitudin, arcu metus tincidunt metus, nec maximus turpis massa sit amet ante. Nullam porta justo convallis augue finibus, at volutpat nisl condimentum.`;
</script>

<Meta
  title="Components/Column"
  component={Column}
  argTypes={{
    xs: { control: "number" },
    sm: { control: "number" },
    md: { control: "number" },
    lg: { control: "number" },
    xl: { control: "number" },
    sl: { control: "number" },
    xs_2: { control: "number" },
    sm_2: { control: "number" },
    md_2: { control: "number" },
    lg_2: { control: "number" },
    xl_2: { control: "number" },
    sl_2: { control: "number" }
  }}
/>

<Template
  let:xs
  let:sm
  let:md
  let:lg
  let:xl
  let:sl
  let:xs_2
  let:sm_2
  let:md_2
  let:lg_2
  let:xl_2
  let:sl_2
>
  <Row>
    <Column {xs} {sm} {md} {lg} {xl} {sl}>
      <div style="width: 100%; background-color: #FC4451;">{lipsum}</div>
    </Column>
    <Column xs={xs_2} sm={sm_2} md={md_2} lg={lg_2} xl={xl_2} sl={sl_2}>
      <div style="width: 100%; background-color: black; color: white;">{lipsum2}</div>
    </Column>
  </Row>
</Template>

<Story
  name="Default"
  args={{
    caption: "Column"
  }}
/>
