# @responsive-ui/upload

> An upload component of responsive-ui.

## Install

```console
npm install @responsive-ui/upload
```

or

```console
yarn add @responsive-ui/upload
```

<br/>

## Properties

```ts
type UploadProps = {
  url: string;
  name?: string;
  class?: string;
  headers?: Record<string, string>;
  accept?: string;
  withCredentials?: boolean;
  directory?: boolean;
  multiple?: boolean;
  value?: string;
  style?: string;
};
```

<br/>

## Usage

```svelte
<script>
  import Upload from '@responsive-ui/upload';
</script>

<Upload on:click={console.log} />
```

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/upload](https://github.com/wetix/responsive-ui/tree/master/components/upload) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
