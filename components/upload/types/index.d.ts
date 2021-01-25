import type { SvelteComponentTyped } from "svelte/internal";

export interface UploadProps {
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
  success?(
    e: CustomEvent<{ response: Record<string, any>; xhr: XMLHttpRequest }>
  ): void;
  error?(e: any): void;
  progress?(e: ProgressEvent<XMLHttpRequestEventTarget>): void;
}

export interface UploadSlots {
  default: {
    loading: boolean;
  };
}

declare class Upload extends SvelteComponentTyped<
  UploadProps,
  UploadEvents,
  UploadSlots
> {}

export default Upload;

// export let onSuccess = (_: XMLHttpRequest) => {};
// export let onProgress = (_: ProgressEvent<XMLHttpRequestEventTarget>) => {};
// export let onError = (
//   _: XMLHttpRequest | ProgressEvent<XMLHttpRequestEventTarget>
// ) => {};
