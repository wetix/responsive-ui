<script lang="ts">
  let className = "";
  export { className as class };
  export let clickable = false;
  export let sizeOf = "sm";
  export let useHref = "";
  export let style = "";
</script>

<i
  class="resp-icon resp-icon--{sizeOf} {className}"
  class:resp-icon--clickable={clickable}
  on:click
  {style}
>
  <slot>
    <svg {...$$restProps}>
      <use xlink:href={useHref} />
    </svg>
  </slot>
</i>

<style lang="scss" global>
  .resp-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;

    &--clickable {
      cursor: pointer;
    }

    &--md {
      width: 32px;
      height: 32px;
    }

    &--lg {
      width: 48px;
      height: 48px;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
</style>
