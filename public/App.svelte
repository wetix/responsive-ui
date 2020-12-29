<script lang="ts">
  import Button from "../packages/button/src/Button.svelte";
  import BottomBar from "../packages/bottom-bar/src/BottomBar.svelte";
  import Date from "../packages/date/src/Date.svelte";
  import Header from "../packages/header/src/Header.svelte";
  // import * as message from "../packages/alert/src";
  import Tab from "../packages/tab/src/Tab.svelte";
  import Icon from "../packages/icon/src/Icon.svelte";
  import Snackbar, { success } from "../packages/snackbar/src";
  import Search from "../packages/search/src/Search.svelte";
  import Textarea from "../packages/textarea/src/Textarea.svelte";
  import Upload from "../packages/upload/src/Upload.svelte";
  import InfiniteScroll from "../packages/infinite-scroll/src/InfiniteScroll.svelte";
  import ComponentDetail from "./components/ComponentDetail.svelte";
  import Label from "../packages/label/src/Label.svelte";
  import Row from "../packages/row/src/Row.svelte";
  import Column from "../packages/column/src/Column.svelte";
  import BottomModal from "../packages/bottom-modal/src/BottomModal.svelte";
  import Switch from "../packages/switch/src/Switch.svelte";
  import Card from "../packages/card/src/Card.svelte";
  import BottomSheet from "../packages/bottom-sheet/src/BottomSheet.svelte";

  console.log(Snackbar);
  // import Upload from "../src/components/upload/index.svelte";
  // import Menu from "../src/components/menu/Nav.svelte";
  // import Table from "../src/components/table/Table.svelte";
  // import Dock from "./components/dock/Dock.svelte";
  // import Notification from "./components/notification/Notification.svelte";
  // import { success } from "../src/components/notification/index";
  // import Icon from "./components/icon/Icon.svelte";
  // import Index from "./components/button/index.svelte";
  // import Checkbox from "../src/components/checkbox/index.svelte";

  const displayMessage = () => {
    // message.open();
  };

  const uploadUrl = `https://api.imgbb.com/1/upload??expiration=600&key=1ee88e36c9774d863a1d133669f3f4d6`;
  const uploadSuccessful = ({ detail }) => {
    console.log(detail.response);
    console.log(detail);
  };

  let disabledButton = false;
  let showModal = false;
  const defaultItems = ["John Doe", "Testing", "tester", "unittest"];
  let items = defaultItems.slice();

  const search = (value: string) => {
    const regexp = new RegExp(value, "i");
    items = defaultItems.filter((v) => regexp.test(v));
    console.log(value);
  };

  const showNotification = (variant: string) => () => {
    success({
      variant,
      message: "testing",
      timeout: 0,
    });
    // success({
    //   title: "Apple can get away with this because they’re well, Apple.",
    //   description:
    //     "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    //   duration: 0,
    //   placement: "top-right",
    // });
  };

  // const items = [
  //   { title: "Dashboard", icon: "stat" },
  //   { title: "Reporting", icon: "receipt" },
  //   {
  //     title: "Long title here, lorem ipsum etc....",
  //     href: "https://www.google.com",
  //     align: "center",
  //   },
  //   {
  //     title: "Long title here, lorem ipsum etc....",
  //     submenus: [{ title: "C.B" }, { title: "C.C" }],
  //   },
  // ];

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

  const tabItems = [
    {
      title: "Item A",
    },
    {
      title: "Item B",
    },
    {
      title: "Item C",
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
    /* text-align: center; */
    padding: 15px;
    /* flex-grow: 1; */
    /* max-width: 240px; */
    margin: 0 auto;
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
    <Header title="Responsive UI">
      <Icon type="filter" on:click={() => (showModal = true)} />
    </Header>
    <div>
      <Button on:click={displayMessage}>Display message</Button>
    </div>
    <Search {search} />
    <div style="padding: 10px 5px;">
      <InfiniteScroll>
        {#each items as item, i}
          <div>{i + 1}. {item}</div>
        {/each}
      </InfiniteScroll>
    </div>
    <Card>
      <Row>
        <Column span={{ sm: 6, xs: 10 }}>Upload</Column>
        <Column span={{ sm: 18 }}>
          <Upload
            name="image"
            url={uploadUrl}
            withCredentials={false}
            on:success={uploadSuccessful} />
        </Column>
      </Row>
      <Row>
        <Column span={{ sm: 6, xs: 10 }}>Disabled Button</Column>
        <Column span={{ sm: 18 }}>
          <Switch bind:checked={disabledButton} />
        </Column>
      </Row>
    </Card>
    <Label title="Description">
      <Textarea placeholder="Enter your text here..." />
    </Label>
    <Button on:click={showNotification('success')}>Show Success</Button>
    <Button on:click={showNotification('error')}>Show Error</Button>
    <Date />
    <Tab items={tabItems} selected={0} let:selected={index}>
      {#if index === 0}
        <div>Testing</div>
      {:else}
        <div>Others</div>
      {/if}
    </Tab>
  </main>
  <BottomBar>
    <Button disabled={disabledButton} on:click={showNotification('default')}>
      CONFIRM
    </Button>
  </BottomBar>
</div>

<!-- <BottomModal  /> -->
<BottomSheet title="Testing" bind:open={showModal}>asdlkasjkdljasl</BottomSheet>
