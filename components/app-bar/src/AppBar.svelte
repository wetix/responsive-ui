<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import Icon from "../../icon/src/Icon.svelte";
  import Tab from "../components/Tab.svelte";
  import Drawer from "../components/Drawer.svelte";
  import Dropdown from "../components/Dropdown.svelte";
  import type { NavItem } from "../types";

  export let logoSrc = "";
  export let tabItems: NavItem[] = [];
  export let selecteTabIndex = 0;
  export let navItems: NavItem[] = [];
  export let dropdownItems: NavItem[] = [];

  let showDropdown = true;
  let openDrawer = false;

  const dispatch = createEventDispatcher();

  const toggleShowDropdown = () => {
    showDropdown = !showDropdown;
  };

  const closeDropdown = (e: MouseEvent) => {
    if (showDropdown) {
      showDropdown = false;
      e.stopPropagation();
    }
  };

  const handleTabChange = (e: CustomEvent) => {
    dispatch("change", e.detail);
  };

  // document.addEventListener("click", closeDropdown);
</script>

<nav class="resp-app-bar" class:resp-app-bar--shadowed={tabItems.length <= 0}>
  <!-- drawer button -->
  <div
    class="resp-app-bar__drawer-button"
    on:click={() => {
      openDrawer = true;
    }}
  >
    <Icon type="hamburger" stroke="#ffff" style="width:35px; height:35px;" />
  </div>

  <!-- container -->
  <div class="resp-app-bar__container">
    <!-- logo-->
    <a class="resp-app-bar__logo" href="/">
      <slot name="logo">
        <img src={logoSrc} alt="logo" />
      </slot>
    </a>

    <!-- navs -->
    <div class="resp-app-bar__nav">
      <ul>
        {#each navItems as item}
          <li><a href={item.link}>{item.label}</a></li>
        {/each}
      </ul>
    </div>

    <!-- dropdown -->
    <div class="resp-app-bar__right">
      <slot name="right">
        {#each dropdownItems as item}
          <a href={item.link}><Icon useHref={item.icon} /></a>
        {/each}
      </slot>
    </div>
  </div>
</nav>

<!-- tab -->
<!-- {#if tabItems}
  <Tab
    on:change={handleTabChange}
    items={tabItems}
    selected={selecteTabIndex}
  />
{/if} -->

<!-- drawer  -->
<Drawer bind:open={openDrawer} items={[...navItems, ...dropdownItems]} />

<style lang="scss">
  .resp-app-bar {
    position: relative;
    display: flex;
    top: 0;
    height: 60px;
    width: 100%;
    z-index: 100;

    &--shadowed {
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    }

    .resp-app-bar__drawer-button {
      background-color: #fc4451;
      padding: 5px;
    }

    .resp-app-bar__container {
      max-width: 1280px;
      width: 80%;
      margin: 0 auto;
      align-items: center;
      display: flex;
      justify-content: space-between;
      // width: 100%;
      // min-height: 45px;

      .resp-app-bar__logo {
        align-self: center;
        img {
          display: block;
          width: 80px;
          height: calc(80px / (2567px / 601px));
          object-fit: cover;
        }
      }

      .resp-app-bar__nav {
        align-self: center;
        ul {
          display: flex;
          list-style-type: none;
          margin: 0;
          padding: 0;

          li {
            margin: 0 1rem;
            a {
              text-decoration: none;
              color: #444444;
              font-size: 1rem;
            }
            a:hover {
              color: #fc4451;
            }
          }
        }
      }

      .resp-app-bar__right {
        align-self: center;
        display: flex;

        .resp-app-bar__right-dropdown {
          position: relative;
        }
      }
    }
  }

  @media (min-width: 640px) {
    .resp-app-bar__drawer-button {
      display: none;
    }
  }

  @media (max-width: 640px) {
    .resp-app-bar__nav,
    .resp-app-bar__right-dropdown {
      display: none;
    }
  }
</style>
