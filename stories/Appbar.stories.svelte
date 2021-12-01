<script>
  import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
  import AppBar from "../components/app-bar/src/AppBar.svelte";
</script>

<Meta
  title="Components/App Bar"
  component={AppBar}
  argTypes={{
    tabItems: { control: "object" },
    centerItems: { control: "object" },
    dropdownItems: { control: "object" },
  }}
/>

<Template let:args>
  <AppBar {...args} />
</Template>

<Story
  name="Default"
  args={{
    tabItems: [
      { value: "PERSONALDETAILS", title: "Personal Details" },
      { value: "PURCHASEHISTORY", title: "Purchase History" },
      { value: "PURCHASEHISTORY", title: "Purchase History" },
      { value: "PURCHASEHISTORY", title: "Purchase History" },
      { value: "PURCHASEHISTORY", title: "Purchase History" },
      { value: "PURCHASEHISTORY", title: "Purchase History" },
    ],
    centerItems: [
      { value: "Movie", link: "/movie" },
      { value: "Store", link: "/store" },
      { value: "Blog", link: "https://articles.wetix.my/" },
    ],
    dropdownItems: [
      { value: "Profile", icon: "profile", link: `/store/me` },
      {
        value: "Purchase History",
        icon: "history",
        link: `/me/purchase-history`,
      },
      { value: "Logout", icon: "logout", link: `/logout` },
    ],
  }}
/>
