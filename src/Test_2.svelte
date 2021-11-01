<script lang="ts">
  import AppBar from "../components/app-bar/src/AppBar.svelte";

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
    { value: "Profile", icon: "profile", link: `/store/me` },
    {
      value: "Purchase History",
      icon: "history",
      link: `/store/me/purchase-history`,
    },
    // { value: "My Tickets", icon: "ticket" },
    // { value: "My Vouchers", icon: "voucher" },
    // { value: "Loyalty", icon: "loyalty" },
    // { value: "Settings", icon: "settings" },
    { value: "Logout", icon: "logout", link: `/logout` },
  ];
</script>

<AppBar {centerItems} {tabItems} {dropdownItems} />
