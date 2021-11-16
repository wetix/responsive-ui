<script lang="ts">
  export let stroke = "#000";
  export let size = "medium";
  export let useHref = "";
  export let type = "";
</script>

<span class="resp-icon resp-icon--{size}" on:click {...$$restProps}>
  {#if useHref}
    <svg>
      <use xlink:href={useHref} />
    </svg>
  {:else if type === "x"}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 408 408"
      style="enable-background:new 0 0 408 408;"
      xml:space="preserve"
    >
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
      xml:space="preserve"
    >
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
      xml:space="preserve"
    >
      <g>
        <path
          d="M617.858,370.896L221.513,9.705c-13.006-12.94-34.099-12.94-47.105,0c-13.006,12.939-13.006,33.934,0,46.874
           l372.447,339.438L174.441,735.454c-13.006,12.94-13.006,33.935,0,46.874s34.099,12.939,47.104,0l396.346-361.191
           c6.932-6.898,9.904-16.043,9.441-25.087C627.763,386.972,624.792,377.828,617.858,370.896z"
        />
      </g>
    </svg>
  {:else if type == "minus"}
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      width="100%"
      height="100%"
      viewBox="0 0 31.427 31.427"
      xml:space="preserve"
    >
      <path
        d="M1.111 16.832A1.117 1.117 0 010 15.706c0-.619.492-1.111
      1.111-1.111H30.3c.619 0 1.127.492 1.127 1.111s-.508 1.127-1.127
      1.127H1.111z"
        fill={stroke}
      />
    </svg>
  {:else if type == "plus"}
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      width="100%"
      height="100%"
      viewBox="0 0 31.444 31.444"
      xml:space="preserve"
    >
      <path
        d="M1.119 16.841a1.118 1.118 0 01-1.111-1.127c0-.619.492-1.111
        1.111-1.111h13.475V1.127A1.133 1.133 0 0115.722 0c.619 0 1.111.508 1.111
        1.127v13.476h13.475c.619 0 1.127.492 1.127 1.111s-.508 1.127-1.127
        1.127H16.833v13.476c0 .619-.492 1.127-1.111 1.127a1.131 1.131 0
        01-1.127-1.127V16.841H1.119z"
        fill={stroke}
      />
    </svg>
  {:else if type === "hamburger"}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
      <g fill="none" fill-rule="evenodd">
        <g>
          <g>
            <path
              d="M0 0H44V44H0z"
              transform="translate(-8.000000, -114.000000) translate(8.000000, 114.000000)"
            />
            <path
              fill={stroke}
              d="M12.174 27.792c1.198 0 2.173.944 2.173 2.104 0 1.16-.975 2.104-2.173 2.104-1.2 0-2.174-.944-2.174-2.104 0-1.16.975-2.104 2.174-2.104zm20.622.938c.664 0 1.204.523 1.204 1.166 0 .643-.54 1.166-1.204 1.166h-15.48c-.665 0-1.204-.523-1.204-1.166 0-.643.539-1.166 1.204-1.166h15.48zm-20.622-8.834c1.198 0 2.173.944 2.173 2.104 0 1.16-.975 2.104-2.173 2.104-1.2 0-2.174-.944-2.174-2.104 0-1.16.975-2.104 2.174-2.104zm20.622.938c.664 0 1.204.523 1.204 1.166 0 .643-.54 1.165-1.204 1.165h-15.48c-.665 0-1.204-.522-1.204-1.165s.539-1.166 1.204-1.166h15.48zM12.174 12c1.198 0 2.173.943 2.173 2.104 0 1.16-.975 2.104-2.173 2.104-1.2 0-2.174-.945-2.174-2.104 0-1.16.975-2.104 2.174-2.104zm20.622.938c.664 0 1.204.522 1.204 1.166 0 .643-.54 1.165-1.204 1.165h-15.48c-.665 0-1.204-.522-1.204-1.165 0-.644.539-1.166 1.204-1.166h15.48z"
              transform="translate(-8.000000, -114.000000) translate(8.000000, 114.000000)"
            />
          </g>
        </g>
      </g>
    </svg>
  {:else if type === "profile"}
    <svg on:click xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <g fill="none" fill-rule="evenodd">
        <path
          fill={stroke}
          d="M20 12.105c2.22 0 4.026 1.807 4.026 4.026 0 2.22-1.806 4.026-4.026 4.026-2.22 0-4.025-1.806-4.025-4.026 0-2.22 1.805-4.026 4.025-4.026m4.117 8.557c1.234-1.123 2.014-2.735 2.014-4.53C26.131 12.75 23.381 10 20 10c-3.38 0-6.13 2.75-6.13 6.131 0 1.796.78 3.408 2.014 4.53C12.463 21.865 10 25.12 10 28.947c0 .581.472 1.053 1.053 1.053.58 0 1.052-.472 1.052-1.053 0-3.686 3-6.685 6.686-6.685h2.419c3.686 0 6.685 3 6.685 6.685 0 .581.471 1.053 1.052 1.053.581 0 1.053-.472 1.053-1.053 0-3.826-2.463-7.082-5.883-8.285"
          transform="translate(-157.000000, -232.000000) translate(151.000000, 158.000000) translate(6.000000, 70.000000) translate(0.000000, 4.000000)"
        />
        <path
          d="M0 0H40V40H0z"
          transform="translate(-157.000000, -232.000000) translate(151.000000, 158.000000) translate(6.000000, 70.000000) translate(0.000000, 4.000000)"
        />
      </g>
    </svg>
  {/if}
</span>

<style lang="scss">
  .resp-icon {
    cursor: pointer;
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;

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
