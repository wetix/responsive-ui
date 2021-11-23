<script lang="ts">
  let className = "";
  export { className as class };
  export let clickable = false;
  export let size = "small";
  export let useHref = "";
</script>

<span
  class="resp-icon resp-icon--{size} {className}"
  class:resp-icon--clickable={clickable}
  on:click
>
  <svg {...$$restProps}>
    <slot>
      <use xlink:href={useHref} />
    </slot>
  </svg>
</span>

<style lang="scss">
  .resp-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;

    &--clickable {
      cursor: pointer;
    }

    &--medium {
      width: 32px;
      height: 32px;
    }

    &--big {
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
