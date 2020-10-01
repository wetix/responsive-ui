<script lang="ts">
  export let dimension = "32px",
    type = "",
    backdrop = false;
</script>

<style lang="scss">
  .icon {
    display: inline-block;
    width: 32px;
    height: 32px;
    // padding: 2px;
    vertical-align: middle;

    svg {
      display: block;
    }

    &.backdrop {
      background: #e1e1e1;
      border-radius: 50%;
    }
  }
</style>

<i class="icon" class:backdrop style={`width:${dimension};height:${dimension}`}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    {#if type === 'close'}
      <line
        x1="368"
        y1="368"
        x2="144"
        y2="144"
        style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
      <line
        x1="368"
        y1="144"
        x2="144"
        y2="368"
        style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
    {:else if type === 'stat'}
      <rect
        x="64"
        y="320"
        width="48"
        height="160"
        rx="8"
        ry="8"
        style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
      <rect
        x="288"
        y="224"
        width="48"
        height="256"
        rx="8"
        ry="8"
        style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
      <rect
        x="400"
        y="112"
        width="48"
        height="368"
        rx="8"
        ry="8"
        style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
      <rect
        x="176"
        y="32"
        width="48"
        height="448"
        rx="8"
        ry="8"
        style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
    {:else if type === 'receipt'}
      <polyline
        points="160 336 160 48 192 64 224 48 255.94 64 288.31 48 320 64 351.79
        48 383.72 64 416 48 448.01 64 480 48 480 272"
        style="fill:none;stroke:#000;stroke-linejoin:round;stroke-width:32px" />
      <path
        d="M480,272V384a80,80,0,0,1-80,80h0a80,80,0,0,1-80-80V336H48a15.86,15.86,0,0,0-16,16c0,64,6.74,112,80,112H400"
        style="fill:none;stroke:#000;stroke-linejoin:round;stroke-width:32px" />
      <line
        x1="224"
        y1="144"
        x2="416"
        y2="144"
        style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
      <line
        x1="288"
        y1="224"
        x2="416"
        y2="224"
        style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px" />
    {:else if type === 'chevron-up'}
      <polyline
        points="112 328 256 184 400 328"
        style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px" />
    {:else}unk{/if}
  </svg>
</i>
