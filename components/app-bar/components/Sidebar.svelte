<script lang="ts">
  import Icon from "../../icon/src/Icon.svelte";
  import type { CenterItem } from "../types";

  export let centerItems: CenterItem[] = [];

  const onClose = () => {};
</script>

<!-- sidebar -->
<nav class="resp__app-bar__side-bar">
  <div class="resp__app-bar__side-bar__header">
    <div class="resp__app-bar__side-bar__left">
      <Icon type="hamburger" style="width:40px; height:40px" />
      <span style="margin-left:10px;">MENU</span>
    </div>
    <div class="resp__app-bar__side-bar__right">
      <span class="side-bar__button" on:click={onClose}>
        <Icon type="x" style="width:20px; height:20px;" />
      </span>
    </div>
  </div>
  <ul>
    {#each centerItems as item}
      <li><a href={item.link}>{item.value}</a></li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  .resp__app-bar__side-bar {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #fc4451;
    z-index: 101;
    top: 0;
    left: -100vw;

    ul {
      padding: 15px;
      li {
        list-style: none;
        padding: 15px;
        border-bottom: 1px #f0f0f0 dashed;

        a {
          text-decoration: none;
          color: white;
        }
      }
    }

    &__header {
      display: flex;
      flex-direction: row;
      padding: 15px;
      justify-content: space-between;
      background-color: white;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    }

    &__left {
      color: #fc4451;
      font-size: 18px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__button {
      cursor: pointer;
    }
  }
</style>
