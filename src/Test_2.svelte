<script lang="ts">
  import AppBar from "../components/app-bar/src/AppBar.svelte";
  import Modal from "../components/modal/src/Modal.svelte";
  import RangeSlider from "../components/range/src/Range.svelte";

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

  let openModal = true;
</script>

<!-- <AppBar {centerItems} {tabItems} {dropdownItems} /> -->

<Modal bind:open={openModal} on:cancel={() => (openModal = false)}
  >Testing</Modal
>
<div style="padding: 2rem">
  <RangeSlider
    min="100"
    max="1000"
    bind:lowerVal={lowSlideValue}
    bind:upperVal={upSlideValue}
  />
  <p>Low: {lowSlideValue}</p>
  <p>Up: {upSlideValue}</p>

  {#each new Array(10) as _}
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  {/each}

  <button on:click={() => (openModal = true)}>Open Modal</button>
</div>
