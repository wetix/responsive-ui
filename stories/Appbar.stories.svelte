<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import AppBar from "@responsive-ui/app-bar";

  let marginTop = 0;
</script>

<Meta
  title="Components/App Bar"
  component={AppBar}
  argTypes={{
    shadowed: { control: "boolean" }
    // centerItems: { control: "object" },
    // dropdownItems: { control: "object" },
  }}
/>

<Template let:args>
  <AppBar
    bind:clientHeight={marginTop}
    {...args}
    menuCaption="Lorem Ipsum is simply dummy text."
    leadingItems={[
      {
        key: "tickets",
        label: "Tickets",
        link: "/tickets",
        subItems: [
          {
            key: "movie",
            label: "Movie",
            link: "/movie"
          },
          {
            key: "event",
            label: "Event",
            link: "/event"
          },
          {
            key: "concert",
            label: "Concert",
            link: "/concert"
          }
        ]
      },
      { key: "profile", label: "Profile", link: "/me/profile" },
      { key: "events", label: "Events", link: "/events" }
    ]}
    trailingItems={[
      { label: "A", link: "/A" },
      { label: "B", link: "/B" },
      { label: "C", link: "/C" },
      { label: "D", link: "/D" }
    ]}
    on:click={(e) => e.preventDefault()}
  >
    <div slot="logo">
      <img
        src="https://sb.wetix.my/_app/assets/wetix-0ab069ec.png"
        style="height: 30px; width: auto; object-fit: contain; vertical-align: middle;"
        alt="WeTix"
      />
    </div>
    <span slot="trailing-item" let:item>
      {item.label}
    </span>
    <div>
      {#each new Array(10) as item}
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
  <div style={`margin-top: ${marginTop}px`}>
    {#each new Array(10) as item}
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
