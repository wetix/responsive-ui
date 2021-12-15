<script lang="ts">
  import { noop } from "svelte/internal";
  import { fade } from "svelte/transition";

  let className = "";
  export { className as class };
  export let label = "";
  export let open = false;
  export let maskClosable = true;
  export let width = "280px";
  export let placement = "left";
  export let style = "";
</script>

{#if open}
  <div
    class="resp-docker__overlay"
    on:click={maskClosable ? () => (open = !open) : noop}
    in:fade
    out:fade
  />
{/if}
<aside
  class="resp-docker resp-docker--{placement} {className}"
  class:resp-docker--close={!open}
  style={`width: ${width}; ${style}`}
  on:click
  {...$$restProps}
>
  <header class="resp-docker__header">
    <div class="resp-docker__header-label"><h2>{label}</h2></div>
    <span class="resp-docker__header-close">
      <i class="resp-docker__icon" on:click={() => (open = false)}>
        {@html `<svg width="1em" height="1em" viewBox="64 64 896 896" focusable="false" data-icon="close" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" /></svg>`}
      </i>
    </span>
  </header>
  <div class="resp-docker__body"><slot /></div>
</aside>

<style lang="scss">
  $headerHeight: 50px;

  @mixin dockerStyle {
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: #fff;
    overflow: hidden;
    transition: all 0.5s;
    z-index: 100;
  }

  .resp-docker {
    @include dockerStyle;
    box-shadow: 1px 0 10px rgba(0, 0, 0, 0.1);
    transform: translateX(0%);

    &__header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      height: $headerHeight;
      border-bottom: 1px solid #f5f5f5;

      &-label {
        flex-grow: 1;
        min-width: 0;
        margin-right: 0.25rem;
      }

      h2 {
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        text-overflow: ellipsis;
        line-height: 1.2;
        padding: 0;
      }
    }

    &__body {
      position: relative;
      top: $headerHeight;
      height: calc(100% - $headerHeight);
      overflow-y: auto;
    }

    &__header-close {
      flex: 0 0 30px;
    }

    &__icon {
      cursor: pointer;
      position: relative;
      left: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 28px;
      transition: all 0.3s;

      &:hover {
        color: #000;
        border-radius: 50%;
        background: #f7f7f7;
      }
    }

    &--left {
      left: 0;
      &.resp-docker--close {
        transform: translateX(-110%);
      }
    }

    &--right {
      right: 0;
      &.resp-docker--close {
        transform: translateX(110%);
      }
    }

    &__overlay {
      @include dockerStyle;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      background-color: rgba(0, 0, 0, 0.6);
    }

    @media (max-width: 576px) {
      width: 100% !important;
    }
  }
</style>
