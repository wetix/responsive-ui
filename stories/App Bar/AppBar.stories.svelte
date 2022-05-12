<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import AppBar from "@responsive-ui/app-bar";
  import Menu from "@responsive-ui/menu";
  import docs from "./AppBar.docs.mdx";

  let marginTop = 0;

  const leadingItems = [
    {
      key: "tickets",
      label: "Tickets",
      href: "#",
      icon: "#profile",
      subItems: [
        {
          key: "movie",
          label: "Movie",
          href: "#"
        },
        {
          key: "event",
          label: "Event",
          href: "#"
        },
        {
          key: "concert",
          label: "Concert",
          href: "#"
        }
      ]
    },
    { key: "profile", icon: "#profile", label: "Profile", href: "#" },
    { key: "events", icon: "#profile", label: "Events", href: "#" }
  ];

  const trailingItems = [
    { key: "A", label: "A", href: "#" },
    { key: "B", label: "B", href: "#" },
    { key: "C", label: "C", href: "#" },
    { key: "D", label: "D", href: "#" }
  ];

  const options = [
    { key: "A", label: "A", link: "#", separator: true },
    { key: "B", label: "B", link: "#" },
    { key: "C", label: "C", link: "#", separator: true },
    { key: "D", label: "D", link: "#" }
  ];

  const handleOptionSelect = (e) => {
    console.log(e.detail);
  };
</script>

<Meta
  title="Components/App Bar"
  component={AppBar}
  parameters={{
    docs: {
      page: docs
    }
  }}
  argTypes={{
    shadowed: { control: "boolean" },
    currentPath: { control: "text" }
    // centerItems: { control: "object" },
    // dropdownItems: { control: "object" },
  }}
/>

<Template let:args>
  {@html `
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="profile" viewBox="6 6 20 20">
        <g fill="none" fill-rule="evenodd">
          <path
            d="M16 8.105a4.03 4.03 0 0 1 4.026 4.026A4.03 4.03 0 0 1 16 16.157a4.03 4.03 0 0 1-4.025-4.026A4.03 4.03 0 0 1 16 8.105m4.117 8.557a6.11 6.11 0 0 0 2.014-4.53C22.131 8.75 19.381 6 16 6c-3.38 0-6.13 2.75-6.13 6.131 0 1.796.78 3.408 2.014 4.53C8.463 17.865 6 21.12 6 24.947a1.053 1.053 0 0 0 2.105 0 6.693 6.693 0 0 1 6.686-6.685h2.419a6.692 6.692 0 0 1 6.685 6.685 1.053 1.053 0 0 0 2.105 0c0-3.826-2.463-7.082-5.883-8.285"
            fill="#FC4451"
          />
        </g>
      </symbol>
    </svg>
  `}
  <AppBar
    bind:clientHeight={marginTop}
    {...args}
    {leadingItems}
    {trailingItems}
    on:click={(e) => e.preventDefault()}
  >
    <div slot="logo">
      <img
        src="/wetix.svg"
        style="height: 24px; width: auto; object-fit: contain; vertical-align: middle;"
        alt="WeTix"
      />
    </div>
    <span slot="trailing-item" let:item>
      {item.label}
    </span>
    <div>
      {#each new Array(10) as _}
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages, and more
          recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
        </p>
      {/each}
    </div>
    <div slot="footer" style="padding: 1rem;">
      <div>i'm a footer</div>
      <div>i'm a footer</div>
      <div>i'm a footer</div>
    </div>
    <!-- <svg
      slot="trailing-item"
      width="24"
      height="24"
      viewBox="0 0 44 44"
      style="cursor: pointer; display: block"
    >
      <g fill="none" fill-rule="evenodd">
        <path d="M0 0h44v44H0z" />
        <g fill="#FC4451">
          <path
            d="M29.24 25.675H18.981a2.211 2.211 0 0 1-2.2-2.015l-3.106-10.402h-2.546a1.129 1.129 0 1 1 0-2.258h3.386c.499 0 .939.328 1.082.806l3.387 11.338c.03.105.047.214.047.323l10.21-.05c0-.104-.036-.158-.008-.258l1.85-6.515h-8.666a1.129 1.129 0 1 1 0-2.257h10.16a1.13 1.13 0 0 1 1.086 1.437l-2.222 7.827a2.21 2.21 0 0 1-2.2 2.024M15.644 30.19a2.258 2.258 0 1 1 4.516 0 2.258 2.258 0 0 1-4.516 0M28.062 30.19a2.258 2.258 0 1 1 4.515 0 2.258 2.258 0 0 1-4.515 0"
          />
        </g>
      </g>
    </svg> -->
    <!-- <div slot="trailing">WeTix</div> -->
  </AppBar>
  <div class="body" style={`margin-top: ${marginTop}px`}>
    {#each new Array(10) as _}
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industry's standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type specimen
        book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with
        the release of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions of Lorem
        Ipsum.
      </p>
    {/each}
  </div>
</Template>

<Story name="Default" />

<Template id="CustomLeadingItem" let:args>
  <AppBar
    bind:clientHeight={marginTop}
    {...args}
    {leadingItems}
    {trailingItems}
    on:click={(e) => e.preventDefault()}
  >
    <div slot="logo">
      <img
        src="/wetix.svg"
        style="height: 24px; width: auto; object-fit: contain; vertical-align: middle;"
        alt="WeTix"
      />
    </div>
    <div>
      {#each new Array(10) as _}
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages, and more
          recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
        </p>
      {/each}
    </div>
    <svelte:fragment slot="trailing-item" let:item>
      {#if item.key === "C"}
        <Menu {options} on:optionselect={handleOptionSelect}>{item.label}</Menu>
      {:else}
        <div>{item.label}</div>
      {/if}
    </svelte:fragment>
  </AppBar>
  <div class="body" style:margin-top="{marginTop}px">
    {#each new Array(10) as _}
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
        Ipsum has been the industry's standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type specimen
        book. It has survived not only five centuries, but also the leap into electronic
        typesetting, remaining essentially unchanged. It was popularised in the 1960s with
        the release of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions of Lorem
        Ipsum.
      </p>
    {/each}
  </div>
</Template>

<Story template="CustomLeadingItem" name="Custom Leading Item" />
