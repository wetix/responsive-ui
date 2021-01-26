<script lang="ts">
  export let block = false;
  export let hint = "unknown";

  let cssStyle = `position:relative;display:${
    block ? "block" : "inline-block"
  }`;
  let hide = true;
  const mounted = (node: HTMLDivElement) => {
    const style = window.getComputedStyle(node.firstElementChild);
    console.log();
    // cssStyle = `position:${style.getPropertyValue("position")}`;

    node.addEventListener("mouseenter", (e) => {
      hide = false;
    });
    node.addEventListener("mouseleave", (e) => {
      hide = true;
    });
  };
</script>

<div class="slot" use:mounted style={cssStyle}>
  <slot />
  {#if !hide}
    <div class="bounding-box">
      <div class="component-name">{hint}</div>
    </div>
  {/if}
</div>

<style lang="scss">
  .slot {
    cursor: default;
    padding: 5px;
    position: relative;
    display: inline-block;

    .bounding-box {
      pointer-events: none;
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border-radius: 5px;
      border-color: #fc4451;
      border-style: solid;
      border-width: 2px;

      .component-name {
        left: 50%;
        transform: translateX(-50%);
        display: inline-flex;
        white-space: nowrap;
        padding: 2px 6px;
        border-radius: 6px;
        font-size: 10px;
        position: relative;
        bottom: 28px;
        background: #fc4451;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
        color: #fff;
        z-index: 5px;
      }
    }
  }
</style>
