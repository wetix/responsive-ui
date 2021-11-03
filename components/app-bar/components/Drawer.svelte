<script lang="ts">
  import Icon from "../../icon/src/Icon.svelte";
  import type { NavItem } from "../types";

  export let items: NavItem[] = [];
  export let open: boolean = false;

  let drawer: HTMLElement;
  let width: number;
  let user: string = "John Doe";

  const onClose = () => {
    drawer.style.transition = "0.5s";
    drawer.style.left = `-${width}px`;
    open = false;
  };

  $: if (open) {
    drawer.style.transition = "0.5s";
    drawer.style.left = `0px`;
  }

  $: if (width) {
    drawer.style.transition = "none";
    drawer.style.left = `-${width}px`;
  }
</script>

<svelte:window bind:innerWidth={width} />

<!-- drawer -->
<nav bind:this={drawer} class="resp__app-bar__drawer">
  <!-- header  -->
  <div class="resp__app-bar__drawer__header">
    <Icon
      type="x"
      stroke="#fc4451"
      style="width:15px; height:15px;"
      on:click={onClose}
    />
  </div>
  <div class="resp__app-bar__drawer__container">
    <!-- user  -->
    <div class="user">
      <p class="text">Signed in as:</p>
      <p class="name">
        {user}
      </p>
    </div>
    <ul>
      {#each items as item}
        <a href={item.link}>
          <li>
            <Icon
              type={item.icon}
              stroke="#fc4451"
              style="margin-right:5px; width:40px; height:40px;"
            />
            {item.value}
          </li>
        </a>
      {/each}
    </ul>
  </div>
</nav>

<style lang="scss">
  .resp__app-bar__drawer {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #fff, $alpha: 0.9);
    z-index: 102;
    top: 0;
    left: -100vw;

    .resp__app-bar__drawer__header {
      text-align: right;
      padding: 10px;
      background-color: #fff;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    }

    .resp__app-bar__drawer__container {
      padding: 15px;
      .user {
        border-bottom: #fc4451 1px dashed;
        padding-bottom: 10px;
        .text {
          font-size: 0.813rem;
        }
        .name {
          color: #fc4451;
          font-weight: bold;
        }
      }

      ul {
        a {
          text-decoration: none;
          color: #1a1b1c;
          li {
            list-style: none;
            border-bottom: 1px #f0f0f0 dashed;
          }
        }
      }
    }
  }
</style>
