<script lang="ts">
  import Button from "../packages/button/src/Button.svelte";
  import Snackbar, { success } from "../packages/snackbar/src/index.js";
  // import Tag from "../src/components/tag/Tag.svelte";
  // import Upload from "../src/components/upload/index.svelte";
  // import Menu from "../src/components/menu/Nav.svelte";
  // import Table from "../src/components/table/Table.svelte";
  // import Dock from "./components/dock/Dock.svelte";
  // import Notification from "./components/notification/Notification.svelte";
  // import { success } from "../src/components/notification/index";
  // import Icon from "./components/icon/Icon.svelte";
  // import Index from "./components/button/index.svelte";
  // import Checkbox from "../src/components/checkbox/index.svelte";

  const showNotification = () => {
    success({
      title: "testing",
    });
    // success({
    //   title: "Apple can get away with this because they’re well, Apple.",
    //   description:
    //     "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    //   duration: 0,
    //   placement: "top-right",
    // });
  };

  const items = [
    { title: "Dashboard", icon: "stat" },
    { title: "Reporting", icon: "receipt" },
    {
      title: "Long title here, lorem ipsum etc....",
      href: "https://www.google.com",
      align: "center",
    },
    {
      title: "Long title here, lorem ipsum etc....",
      submenus: [{ title: "C.B" }, { title: "C.C" }],
    },
  ];

  const columns = [
    { key: "name", title: "A" },
    { key: "status", title: "B" },
    { key: "status", title: "C" },
    { key: "status", title: "D" },
    { key: "status", title: "E" },
    { key: "name", title: "AA" },
    { key: "status", title: "F" },
    { key: "name", title: "Z" },
  ];
  const records = [
    { name: "sianloong", status: "success" },
    { name: "kk", status: "success" },
  ];

  const uploadProps = {
    name: "image",
    url: "https://api.imgur.com/3/upload",
    method: "post",
    headers: {
      Authorization: "Client-ID a70383e65634c6d",
    },
  };

  const accordionItems = [
    {
      title: "Title 1",
    },
    {
      title: "Title 2",
    },
  ];
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap");

  :global(body) {
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    background: #fff;
    font-size: 14px;
    padding: 0;
  }

  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  main {
    text-align: center;
    padding: 1em;
    flex-grow: 1;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .container {
    display: flex;
    width: 100%;
    height: 100%;
  }
</style>

<div class="container">
  <main>
    <Button on:click={showNotification}>click me</Button>
  </main>
</div>
<!-- <Dock open={true}>Testing</Dock> -->
