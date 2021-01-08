# @responsive-ui/header

> A header component of responsive-ui.

## Install

```console
npm install @responsive-ui/header
```

or

```console
yarn add @responsive-ui/header
```

<br/>

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104027619-99e0f080-5202-11eb-941a-5df881f2938d.png"
alt="@responsive-ui/header" />

<br/>

## Properties, Events & Slots

```ts
interface HeaderProps {
  title: string;
  style?: string;
}

interface HeaderEvents {}

interface HeaderSlots {
  default: {};
}

declare class Header extends SvelteComponentTyped<
  HeaderProps,
  HeaderEvents,
  HeaderSlots
> {}
```

<br/>

## Example

```svelte
<script>
  import Header from '@responsive-ui/header';
</script>

<Header title="Responsive UI" />
```

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/header](https://github.com/wetix/responsive-ui/tree/master/components/header) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
