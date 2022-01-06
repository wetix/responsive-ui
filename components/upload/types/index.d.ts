import type { SvelteComponentTyped } from "svelte/internal";

export interface UploadProps {
  id?: string;
  ref?: HTMLInputElement;
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

export interface UploadEvents {
  success?: any;
  error?: any;
  uploadprogress?: CustomEvent<{}>;
}

export interface UploadSlots {
  default: {
    uploading: boolean;
    dragover: boolean;
  };
}

export declare class UploadComponent extends SvelteComponentTyped<
  UploadProps,
  UploadEvents,
  UploadSlots
> {}

export default UploadComponent;

// export let onSuccess = (_: XMLHttpRequest) => {};
// export let onProgress = (_: ProgressEvent<XMLHttpRequestEventTarget>) => {};
// export let onError = (
//   _: XMLHttpRequest | ProgressEvent<XMLHttpRequestEventTarget>
// ) => {};
