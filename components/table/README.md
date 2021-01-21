# `@responsive-ui/table`

> A table component of responsive-ui.

<p>

[![npm](https://img.shields.io/npm/v/@responsive-ui/table.svg)](https://www.npmjs.com/package/@responsive-ui/table)
[![download](https://img.shields.io/npm/dw/@responsive-ui/table.svg)](https://www.npmjs.com/package/@responsive-ui/table)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Ftable)](https://bundlephobia.com/result?p=@responsive-ui/table)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/table
```

or

```console
yarn add @responsive-ui/table
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104023615-e1647e00-51fc-11eb-8600-989bf7245263.png"
alt="@responsive-ui/table" />

## Properties, Events & Slots

```ts
type TableColumn = {
  key: string;
  title: string;
  class: string;
  align: string | "left" | "center" | "right";
  width: number | string;
  value: ReturnType<any>;
  component: any;
};

type TableItem = Record<string, any> | object;

type TableProps = {
  key: string;
  columns: Partial<TableColumn>[];
  items: null | TableItem[];
  striped?: boolean;
  bordered?: boolean;
  class?: string;
  style?: string;
};

interface TableEvents {}

interface TableSlots {
  row: {
    index: number;
    item: TableItem;
  };
  empty: {};
}

declare class Table extends SvelteComponentTyped<
  TableProps,
  TableEvents,
  TableSlots
> {}
```

## Example

```svelte
<script>
  import Table from "@responsive-ui/table";

   const columns = [
    { title: "Name", key: "name" },
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
    { title: "Offline" },
    { title: "Age", align: "center", key: "age" },
    { title: "Created", key: "created" },
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
</script>

<Table key="key" columns={columns} items={datas} />
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/201ffa5d9c80454f87918ea23535d088?version=3.31.2)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/table](https://github.com/wetix/responsive-ui/tree/master/components/table) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
