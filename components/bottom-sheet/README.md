# @responsive-ui/bottom-sheet

> A action sheet component of responsive-ui.

## Install

```console
npm install @responsive-ui/bottom-sheet
```

or

```console
yarn add @responsive-ui/bottom-sheet
```

<br/>

## Look and Feel

<!-- <img src="https://user-images.githubusercontent.com/28108597/104024747-8f245c80-51fe-11eb-959f-34c879828373.png"
alt="@responsive-ui/bottom-sheet" /> -->

<br/>

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

<BottomSheet
  title="Testing"
  items={tabItems}
  open={true}
  on:filter={onConfirm} />
```

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/bottom-sheet](https://github.com/wetix/responsive-ui/tree/master/components/bottom-sheet) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
