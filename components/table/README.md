# `@responsive-ui/table`

> A table component of responsive-ui.

## Install

```bash
npm install @responsive-ui/table
```

or

```bash
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

```js
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
