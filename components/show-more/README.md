# @responsive-ui/show-more

> A show more component of responsive-ui.

## Install

```console
npm install @responsive-ui/show-more
```

or

```console
yarn add @responsive-ui/show-more
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/105342925-ee7d6600-5c1b-11eb-826a-f24ae3a30545.png"
alt="@responsive-ui/show-more" />

## Properties, Events & Slots

```ts
interface ShowMoreProps {
  text?: string;
  threshold?: number;
  class?: string;
  style?: string;
}

interface ShowMoreEvents {}

interface ShowMoreSlots {
  default: {};
  trigger: {};
}

declare class ShowMore extends SvelteComponentTyped<
  ShowMoreProps,
  ShowMoreEvents,
  ShowMoreSlots
> {}
```

## Example

```svelte
<script>
  import ShowMore from '@responsive-ui/show-more';
</script>

<ShowMore threshold={80}>
  <p>
			Contrary to popular belief, Lorem Ipsum is not simply random text. It has
			roots in a piece of classical Latin literature from 45 BC, making it over
			2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
			College in Virginia, looked up one of the more obscure Latin words,
			consectetur, from a Lorem Ipsum passage, and going through the cites of
			the word in classical literature, discovered the undoubtable source. Lorem
			Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
			Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This
			book is a treatise on the theory of ethics, very popular during the
			Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
			amet..", comes from a line in section 1.10.32.
	</p>
	The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for
	those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
	by Cicero are also reproduced in their exact original form, accompanied by English
	versions from the 1914 translation by H. Rackham.
</ShowMore>
```

[Try it yourself in Svelte Repl](https://svelte.dev/repl/e70235a5b5d041cb84e52e3b5998c45c?version=3.31.2)

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/show-more](https://github.com/wetix/responsive-ui/tree/master/components/show-more) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
