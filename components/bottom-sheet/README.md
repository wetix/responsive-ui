# @responsive-ui/bottom-sheet

> A bottom action sheet component of responsive-ui.

<p>

[![npm](https://img.shields.io/npm/v/@responsive-ui/bottom-sheet.svg)](https://www.npmjs.com/package/@responsive-ui/bottom-sheet)
[![download](https://img.shields.io/npm/dw/@responsive-ui/bottom-sheet.svg)](https://www.npmjs.com/package/@responsive-ui/bottom-sheet)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Fbottom-sheet)](https://bundlephobia.com/result?p=@responsive-ui/bottom-sheet)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/bottom-sheet
```

or

```console
yarn add @responsive-ui/bottom-sheet
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104710050-9695b980-575a-11eb-8be1-00e358236f1a.png"
alt="@responsive-ui/bottom-sheet" />

## Properties, Events & Slots

```ts
type BottomSheetOption = {
  title: string;
  value: string;
  icon?: string | SvelteComponentDev;
  disabled?: boolean;
  selected?: boolean;
};

interface BottomSheetItem {
  title: string;
  options: BottomSheetOption[];
  selected?: Map<string, boolean>;
  style?: string;
}

interface BottomSheetProps {
  items: BottomSheetItem[];
  open?: boolean;
  selected?: number;
  disabled?: boolean;
  closable?: boolean;
}

interface BottomSheetEvents {
  change?: void;
  reset?: void;
  filter?: void;
}

declare class BottomSheet extends SvelteComponentTyped<
  BottomSheetProps,
  BottomSheetEvents
> {}
```

<br/>

## Example

```svelte
<script>
  import BottomSheet from '@responsive-ui/bottom-sheet';

  const tabItems = [
    {
      title: "Item A",
      options: [
        {
          title: "Item A - First Option",
          value: "a1",
        },
        {
          title: "Item A - Second Option",
          value: "a2",
        },
        {
          title: "Item A - Third Option",
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

<BottomSheet
  items={tabItems}
  open={true}
  on:filter={onConfirm} />
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/33e75aaad3dc4ca29194c90acc0dfbed?version=3.31.2)

<br/>

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/bottom-sheet](https://github.com/wetix/responsive-ui/tree/master/components/bottom-sheet) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
