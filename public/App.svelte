<script lang="ts">
  import * as ResponsiveUI from "../components/responsive-ui/index.js";
  import BottomBar from "../components/bottom-bar/src/BottomBar.svelte";
  import BottomSheet from "../components/bottom-sheet/src/BottomSheet.svelte";
  import Button from "../components/button/src/Button.svelte";
  import DatePicker from "../components/date-picker/src/DatePicker.svelte";
  import Header from "../components/header/src/Header.svelte";
  import Icon from "../components/icon/src/Icon.svelte";
  import Label from "../components/label/src/Label.svelte";
  // import * as message from "../components/alert/src";
  import * as Snackbar from "../components/snackbar/src";
  import Row from "../components/row/src/Row.svelte";
  import Column from "../components/column/src/Column.svelte";
  import Search from "../components/search/src/Search.svelte";
  import Table from "../components/table/src/Table.svelte";
  import Tag from "../components/tag/src/Tag.svelte";
  import Textarea from "../components/textarea/src/Textarea.svelte";
  import Upload from "../components/upload/src/Upload.svelte";
  import InfiniteScroll from "../components/infinite-scroll/src/InfiniteScroll.svelte";
  // import ComponentDetail from "./components/ComponentDetail.svelte";
  import Switch from "../components/switch/src/Switch.svelte";
  import Card from "../components/card/src/Card.svelte";
  import FloatingActionButton from "../components/fab/src/FloatingActionButton.svelte";
  import Input from "../components/input/src/Input.svelte";
  import InputNumber from "../components/input-number/src/InputNumber.svelte";
  import Poster from "../components/poster/src/Poster.svelte";
  import Responsive from "../components/responsive/src/Responsive.svelte";
  import Ellipsis from "../components/ellipsis/src/Ellipsis.svelte";
  import Link from "../components/link/src/Link.svelte";
  import Select from "../components/select/src/Select.svelte";
  import Online from "./components/Online.svelte";
  import Logo from "./components/Logo.svelte";
  import BottomModal from "../components/bottom-modal/src/BottomModal.svelte";
  import Tab from "../components/tab/src/Tab.svelte";
  import Checkbox from "../components/checkbox/src/Checkbox.svelte";
  import type { SvelteComponentDev } from "svelte/internal";

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

  const wrapComponent = (
    Component,
    props: Record<string, any> = {},
    events: Record<string, Function> = {}
  ): ((_: Record<string, any>) => SvelteComponentDev) => {
    return function (opts: Record<string, any>) {
      opts.props || (opts.props = {});
      Object.assign(opts.props, props);
      const comp = new Component(opts);
      Object.entries(events).every(([event, cb]) => {
        comp.$on(event, cb);
      });
      return comp;
    };
  };

  console.log(wrapComponent(Online, {})({ target: document.body }));
  const displayMessage = () => {
    // message.open();
  };

  const uploadUrl = `https://api.imgbb.com/1/upload??expiration=600&key=1ee88e36c9774d863a1d133669f3f4d6`;
  const columns = [
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Email",
      key: "email",
      value: (v) => (v ? v : "-"),
    },
    {
      title: "Amount",
      align: "right",
      value: ({ amount }) => `RM ${(amount || 0).toFixed(2)}`,
    },
    {
      title: "Offline",
      align: "center",
      component: ({ online }) => wrapComponent(Online, { online }),
    },
    { title: "Age", align: "center", key: "age" },
    { title: "Created", key: "created" },
    // {
    //   align: "center",
    //   component: (v) =>
    //     wrapComponent(
    //       Icon,
    //       { type: "more" },
    //       {
    //         click() {
    //           console.log("click data =>", v);
    //         },
    //       }
    //     ),
    // },
  ];

  const datas = [
    {
      key: "1",
      name: "John Doe",
      age: 19,
      online: false,
      amount: 10.5,
      created: "2020 Jan 01",
    },
    {
      key: "2",
      name: "Willie",
      email: "willie@hotmail.com",
      age: 24,
      online: false,
      amount: 3.38,
      created: "2020 Feb 27",
    },
    {
      key: "3",
      name: "The Joker",
      age: 16,
      online: true,
      amount: 1020.6,
      created: "2006 Oct 1",
    },
    {
      key: "4",
      name: "Batman",
      age: 30,
      online: false,
      amount: 1.445,
      created: "2006 Oct 1",
    },
    {
      key: "5",
      name: "The Joker",
      age: 16,
      online: true,
      amount: 45.78,
      created: "2006 Oct 1",
    },
  ];

  const uploadSuccessful = ({ detail }) => {
    console.log(detail.response);
    console.log(detail);
  };

  let disabledButton = false;
  let showModal = false;
  const defaultItems = ["John Doe", "Testing", "tester", "unittest"];
  let items = defaultItems.slice();

  const onSearch = ({ detail }) => {
    const regexp = new RegExp(detail, "i");
    items = defaultItems.filter((v) => regexp.test(v));
    console.log(detail);
  };

  const showNotification = (variant: string) => () => {
    Snackbar.show({
      text: "testing",
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
      options: [
        {
          title: "Item A - First Option",
          icon: wrapComponent(Logo, {}),
          value: "a1",
        },
        {
          title: "Item A - Second Option",
          value: "a2",
        },
        {
          title: "Item A - Third Option",
          icon: wrapComponent(Logo, {}),
          value: "a3",
        },
        {
          title: "Item A - Fourth Option",
          value: "a4",
        },
        {
          title: "Item A - Fifth Option",
          value: "a5",
        },
      ],
    },
    {
      title: "Item B",
      options: [
        {
          title: "Item B - First Option",
          icon: wrapComponent(Logo, {}),
          value: "b1",
        },
        {
          title: "Item B - Second Option",
          value: "b2",
        },
        {
          title: "Item B - Third Option",
          value: "b3",
        },
      ],
    },
    {
      title: "Item C",
      options: [
        {
          title: "Item C - First Option",
          value: "c1",
        },
        {
          title: "Item C - Ten Option",
          value: "c10",
        },
      ],
    },
  ];

  const onConfirm = ({ detail }) => {
    console.log(detail);
  };
</script>

<div class="container">
  <main>
    <Header title="Responsive UI">
      <Icon type="filter" on:click={() => (showModal = true)} />
    </Header>

    <Icon type="more" />
    <Icon type="right-arrow" />
    <Icon type="x" />
    <Icon type="filter" />
    <Tab items={tabItems}>
      <div />
    </Tab>

    <div style="padding: 50px 0;">
      <Tag value="Blue" />
      <Tag color="red" value="Red" />
      <Tag color="yellow" value="Yellow" />
      <Tag color="orange" value="Orange" />
      <Tag color="green" value="Green" />
      <Tag color="grey" value="Grey" />
    </div>

    <div class="padding">
      <Search
        on:search={onSearch}
        placeholder="Enter your keyword here to search..."
      />
    </div>
    <div style="padding: 10px 5px; border: 1px solid red;">
      <InfiniteScroll>
        {#each items as item, i}
          <div>{i + 1}. {item}</div>
        {/each}
      </InfiniteScroll>
    </div>
    <div class="padding">
      <Poster
        src="data:image/png;base64,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"
      />
    </div>
    <div style="width: 100%; white-space: nowrap">
      <Ellipsis>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
        <Link>Lorem Ipsum</Link>
        has been the industry's standard dummy text ever since the 1500s, when an
        unknown printer took a galley of type and scrambled it to make a type specimen
        book.
      </Ellipsis>
    </div>
    <div class="padding">
      <Responsive let:aspectRatio>
        {#if aspectRatio > 1}
          <Table key="key" {columns} items={datas} />
        {:else}
          {#each datas as data}
            <Card>
              <div>Name : {data.name}</div>
              <div>Created : {data.created}</div>
            </Card>
          {/each}
        {/if}
      </Responsive>
    </div>
    <Card>Content here</Card>
    <Card>
      <Row>
        <Column span={{ sm: 6, xs: 10 }}>Upload</Column>
        <Column span={{ sm: 18 }}>
          <Upload
            name="image"
            url={uploadUrl}
            withCredentials={false}
            on:success={uploadSuccessful}
          />
        </Column>
      </Row>
      <Row alignItems="center">
        <Column span={{ sm: 6, xs: 10 }}>Date Picker</Column>
        <Column span={{ sm: 18 }}>
          <DatePicker />
        </Column>
      </Row>
      <Row>
        <Column span={{ sm: 6, xs: 10 }}>Disabled Button</Column>
        <Column span={{ sm: 18 }}>
          <Switch bind:checked={disabledButton} />
        </Column>
      </Row>
      <Row>
        <Column span={{ sm: 6, xs: 10 }} />
        <Column span={12}>
          <Checkbox />
        </Column>
      </Row>
    </Card>
    <Label title="Text">
      <Input />
    </Label>
    <Label title="Number">
      <InputNumber formatter={(v) => `${v}%`} />
    </Label>
    <Label title="Description">
      <Textarea placeholder="Enter your text here..." />
    </Label>
    <Label>
      <Select
        value="c"
        options={[
          { title: "Option A", value: "a" },
          { title: "Option B", value: "b" },
          { title: "Option C", value: "c" },
          { title: "Option D", value: "d" },
        ]}
      />
    </Label>
    <div>
      <Button on:click={displayMessage}>Display message</Button>
    </div>
    <Button on:click={showNotification("success")}>Show Success</Button>
    <Button on:click={showNotification("error")}>Show Error</Button>
    <DatePicker />
  </main>
  <BottomBar>
    <Button disabled={disabledButton} on:click={showNotification("default")}>
      CONFIRM
    </Button>
  </BottomBar>
</div>

<FloatingActionButton on:click={console.log} />

<!-- <BottomModal bind:open={showModal}>
  <DatePicker />
</BottomModal> -->
<BottomModal bind:open={showModal}>
  <Row style="padding:10px;" justifyContent="space-between">
    <span style="width: 48%">
      <Button outline={true}>CANCEL</Button>
    </span>
    <span style="width: 48%">
      <Button>OK</Button>
    </span>
  </Row>
</BottomModal>
<!-- <BottomSheet
  title="Testing"
  items={tabItems}
  bind:open={showModal}
  on:filter={onConfirm} />
 -->
<!-- <BottomSheet title="Testing" bind:open={showModal} items={tabItems} /> -->

<!-- <Snackbar.default text={`testing\nJello wordl`} /> -->
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
    width: 100%;
  }

  /* @media (min-width: 640px) {
    main {
      max-width: none;
    }
  } */

  .container {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .padding {
    padding: 15px 0;
  }
</style>
