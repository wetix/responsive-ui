<script lang="ts">
  import AppBar from "../components/app-bar/src/AppBar.svelte";
  import RangeSlider from "../components/range-slider/src/RangeSlider.svelte";

  const tabItems = [
    { value: "PERSONALDETAILS", title: "Personal Details" },
    { value: "PURCHASEHISTORY", title: "Purchase History" },
    { value: "PURCHASEHISTORY", title: "Purchase History" },
    { value: "PURCHASEHISTORY", title: "Purchase History" },
    { value: "PURCHASEHISTORY", title: "Purchase History" },
    { value: "PURCHASEHISTORY", title: "Purchase History" },
  ];

  let centerItems = [
    { value: "Movie", link: "/movie" },
    { value: "Store", link: "/store" },
    { value: "Blog", link: "https://articles.wetix.my/" },
    // { value: "Promotion", link: "/promotion" },
  ];

  let dropdownItems = [
    { value: "Profile", icon: "profile", link: `/me` },
    {
      value: "Purchase History",
      icon: "history",
      link: `/me/purchase-history`,
    },
    // { value: "My Tickets", icon: "ticket" },
    // { value: "My Vouchers", icon: "voucher" },
    // { value: "Loyalty", icon: "loyalty" },
    // { value: "Settings", icon: "settings" },
    { value: "Logout", icon: "logout", link: `/logout` },
  ];

  let lowSlideValue: string;
  let upSlideValue: string;
</script>

<AppBar {centerItems} {tabItems} {dropdownItems} />

<div style="padding:150px 10px 10px 10px">
  <RangeSlider
    min="100"
    max="1000"
    bind:lowerVal={lowSlideValue}
    bind:upperVal={upSlideValue}
  />
  <p>Low: {lowSlideValue}</p>
  <p>Up: {upSlideValue}</p>
</div>
