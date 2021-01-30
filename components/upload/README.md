# @responsive-ui/upload

> An upload component of responsive-ui.

<p>

[![Svelte v3](https://img.shields.io/badge/svelte-v3-orange.svg)](https://svelte.dev)
[![npm](https://img.shields.io/npm/v/@responsive-ui/upload.svg)](https://www.npmjs.com/package/@responsive-ui/upload)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/%40responsive-ui%2Fupload)](https://bundlephobia.com/result?p=@responsive-ui/upload)
[![download](https://img.shields.io/npm/dw/@responsive-ui/upload.svg)](https://www.npmjs.com/package/@responsive-ui/upload)
[![LICENCE](https://img.shields.io/github/license/wetix/responsive-ui)](https://github.com/wetix/responsive-ui/blob/master/LICENSE)

</p>

## Install

```console
npm install @responsive-ui/upload
```

or

```console
yarn add @responsive-ui/upload
```

## Look and Feel

<img src="https://user-images.githubusercontent.com/28108597/104028650-f2fd5400-5203-11eb-9e0d-168e502afcbc.png"
alt="@responsive-ui/upload" />

## Properties, Events & Slots

```ts
interface UploadProps {
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
}

interface UploadEvents {
  success?: (xml: XMLHttpRequest) => void;
  error?: (xml: XMLHttpRequest) => void;
  progress?: (xml: XMLHttpRequest) => void;
}

interface UploadSlots {
  default: {
    loading: boolean;
  };
}

declare class Upload extends SvelteComponentTyped<
  UploadProps,
  UploadEvents,
  UploadSlots
> {}
```

## Example

```svelte
<script>
  import Upload from '@responsive-ui/upload';

  const uploadUrl = `https://api.imgbb.com/1/upload?expiration=600&key=1ee88e36c9774d863a1d133669f3f4d6`;
  const uploadSuccessful = ({ detail }) => {
    console.log(detail.response);
    console.log(detail);
  };
</script>

<Upload
  name="image"
  url={uploadUrl}
  withCredentials={false}
  on:success={uploadSuccessful} />
```

## Sponsors

<img src="https://asset.wetix.my/images/logo/wetix.png" alt="WeTix" width="240px">

## License

[@responsive-ui/upload](https://github.com/wetix/responsive-ui/tree/master/components/upload) is 100% free and open-source, under the [MIT license](https://github.com/wetix/responsive-ui/blob/master/LICENSE).

## Big Thanks To

Thanks to these awesome companies for their support of Open Source developers ❤

[![GitHub](https://jstools.dev/img/badges/github.svg)](https://github.com/open-source)
[![NPM](https://jstools.dev/img/badges/npm.svg)](https://www.npmjs.com/)
