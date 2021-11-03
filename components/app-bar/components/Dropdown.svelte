<script lang="ts">
  import type { NavItem } from "../types";
  import Icon from "../../icon/src/Icon.svelte";

  export let items: NavItem[] = [];
  export let user: string = "John Doe";
  export let show = false;
</script>

<div class="resp__app-bar__dropdown" class:hide={!show}>
  <div class="resp__app-bar__user">
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
            stroke="#fc4451"
            style="margin-right:5px; width:40px; height:40px"
            type={`${item.icon || ""}`}
          />
          <span>
            {item.value}
          </span>
        </li>
      </a>
    {/each}
  </ul>
</div>

<style lang="scss">
  .hide {
    display: none;
  }

  .resp__app-bar__dropdown {
    padding: 15px;
    position: absolute;
    z-index: 101;
    right: 0;
    top: 100%;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
    min-width: 200px;

    .resp__app-bar__user {
      cursor: default;
      padding-bottom: 10px;
      border-bottom: #fc4451 1px dashed;
      .text {
        color: #444444;
        font-size: 0.813rem;
      }

      .name {
        color: #fc4451;
        font-size: 0.813rem;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;

      a {
        text-decoration: none;
        color: #1a1b1c;
        font-size: 0.813rem;
        white-space: nowrap;
        li {
          padding: 2.5px 0;
        }
      }
    }
  }
</style>
