<script lang="ts">
  export let stroke = "#000";
  export let type = "";
  export let style = "";
</script>

<span class="responsive-ui-icon" on:click {style}>
  {#if type === "x"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 408 408"
      style="enable-background:new 0 0 408 408;"
      xml:space="preserve">
      <g>
        <path
          d="M228.929,205.01L404.596,29.343c6.78-6.548,6.968-17.352,0.42-24.132c-6.548-6.78-17.352-6.968-24.132-0.42
     c-0.142,0.137-0.282,0.277-0.42,0.42L204.796,180.878L29.129,5.21c-6.78-6.548-17.584-6.36-24.132,0.42
     c-6.388,6.614-6.388,17.099,0,23.713L180.664,205.01L4.997,380.677c-6.663,6.664-6.663,17.468,0,24.132
     c6.664,6.662,17.468,6.662,24.132,0l175.667-175.667l175.667,175.667c6.78,6.548,17.584,6.36,24.132-0.42
     c6.387-6.614,6.387-17.099,0-23.712L228.929,205.01z"
        />
      </g>
    </svg>
  {:else if type === "filter"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {stroke}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      ><line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" /></svg
    >
  {:else if type === "more"}
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      viewBox="0 0 426.667 426.667"
      style="enable-background:new 0 0 426.667 426.667;"
      xml:space="preserve">
      <g>
        <circle cx="42.667" cy="213.333" r="42.667" />
        <circle cx="213.333" cy="213.333" r="42.667" />
        <circle cx="384" cy="213.333" r="42.667" />
      </g>
    </svg>
  {:else if type === "right-arrow"}
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      {stroke}
      width="100%"
      height="100%"
      viewBox="0 0 792.033 792.033"
      style="enable-background:new 0 0 792.033 792.033;"
      xml:space="preserve">
      <g>
        <path
          d="M617.858,370.896L221.513,9.705c-13.006-12.94-34.099-12.94-47.105,0c-13.006,12.939-13.006,33.934,0,46.874
         l372.447,339.438L174.441,735.454c-13.006,12.94-13.006,33.935,0,46.874s34.099,12.939,47.104,0l396.346-361.191
         c6.932-6.898,9.904-16.043,9.441-25.087C627.763,386.972,624.792,377.828,617.858,370.896z"
        />
      </g>
    </svg>
  {/if}
</span>

<style lang="scss">
  .responsive-ui-icon {
    cursor: pointer;
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
</style>
