# `@responsive-ui/table`

> A table component of responsive-ui.

## Install

```console
npm install @responsive-ui/table
```

or

```console
yarn add @responsive-ui/table
```

<br/>

## Properties

```ts
type TableProps = {
  key: string; // table row key
  columns: TableColumn[]; // table columns
  items: TableItem[]; // table records
};

type TableColumn = {
  key?: string; // column value using key path, eg. key=name in object { "name": "John" }
  title?: string; // column name
  class?: string; // custom class name for column
  align?: "left" | "center" | "right"; // column alignment
  width?: number | string; // column width
  value?: (...args: any[]) => any;
  component?: ((...args: any[]) => SvelteComponentDev) | SvelteComponentDev;
};

type TableItem = Record<string, any>;
```

<br/>

## Usage

```svelte
<script>
  import Table from "@responsive-ui/table";

   const columns = [
    { title: "Name", key: "name" },
    { title: "Email", key: "email" },
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
      created: "2020 Jan 01",
    },
    {
      key: "2",
      name: "Willie",
      age: 24,
      online: false,
      created: "2020 Feb 27",
    },
    {
      key: "3",
      name: "The Joker",
      age: 16,
      online: true,
      created: "2006 Oct 1",
    },
    {
      key: "4",
      name: "Batman",
      age: 30,
      online: false,
      created: "2006 Oct 1",
    },
    {
      key: "5",
      name: "The Joker",
      age: 16,
      online: true,
      created: "2006 Oct 1",
    },
  ];
</script>

<Table key="key" columns={columns} items={datas} />
```

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/table](https://github.com/wetix/responsive-ui/tree/master/components/table) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
