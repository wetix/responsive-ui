<script lang="ts">
  import type { DropdownItem } from "../types";
  import Icon from "../../icon/src/Icon.svelte";

  export let items: DropdownItem[] = [];
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
      <li>
        <a href={item.link}>
          <Icon
            stroke="#fc4451"
            style="width:40px; height:40px"
            type={item.icon}
          />
          <span>
            {item.value}
          </span>
        </a>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .hide {
    display: none;
  }

  .resp__app-bar__dropdown {
    position: absolute;
    z-index: 101;
    right: 0;
    top: 100%;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
    min-width: 200px;

    .resp__app-bar__user {
      padding: 15px;
      cursor: default;
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

      li {
        a {
          display: flex;
          align-items: center;
          white-space: nowrap;
          padding: 5px 15px 5px 5px;
          text-decoration: none;
          font-size: 0.813rem;
          color: #444444;
        }
        a:hover {
          background-color: #f0f0f0;
        }
      }
      li:nth-child(1) {
        border-top: 1px #fc4451 dashed;
      }
    }
  }
</style>
