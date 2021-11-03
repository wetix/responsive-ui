<script lang="ts">
  import { onDestroy, createEventDispatcher } from "svelte";

  import Icon from "../../icon/src/Icon.svelte";
  import Tab from "../components/Tab.svelte";
  import Drawer from "../components/Sidebar.svelte";
  import Dropdown from "../components/Dropdown.svelte";
  import type { TabItem, CenterItem, DropdownItem } from "../types";

  export let tabItems: TabItem[];
  export let selecteTabIndex = 0;
  export let centerItems: CenterItem[];
  export let dropdownItems: DropdownItem[];

  let logoSrc = "https://asset.wetix.my/images/logo/wetix.png";

  let showDropdown = false;
  let sideBar: HTMLElement;
  let width: number;

  const dispatch = createEventDispatcher();

  const onCloseSidebar = () => {
    sideBar.style.transition = "0.5s";
    sideBar.style.left = `-${width}px`;
  };

  const onOpenSidebar = () => {
    sideBar.style.transition = "0.5s";
    sideBar.style.left = `0px`;
  };

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

  document.addEventListener("click", closeDropdown);

  onDestroy(() => {
    document.removeEventListener("click", closeDropdown);
  });

  // $: if (width) {
  //   sideBar.style.transition = "none";
  //   sideBar.style.left = `-${width}px`;
  // }
</script>

<svelte:window bind:innerWidth={width} />

<nav
  class="resp__app-bar"
  style={tabItems.length > 0
    ? ""
    : "box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);"}
>
  <!-- side-bar button -->
  <div class="resp__app-bar__sidebar-button" on:click={onOpenSidebar}>
    <Icon type="hamburger" stroke="#ffff" style="width:35px; height:35px;" />
  </div>

  <!-- container -->
  <div class="resp__app-bar__container">
    <!-- logo-->
    <a class="resp__app-bar__logo" href="/store">
      <img src={logoSrc} alt="logo" />
    </a>

    <!-- navs -->
    <div class="resp__app-bar__navs">
      <ul>
        {#each centerItems as item}
          <li><a href={item.link}>{item.value}</a></li>
        {/each}
      </ul>
    </div>

    <!-- dropdown -->
    <div class="resp__app-bar__right">
      <div class="resp__app-bar__right-dropdown">
        <a
          href="/me"
          on:click|preventDefault|stopPropagation={toggleShowDropdown}
        >
          <Icon
            type="profile"
            stroke="#fc4451"
            style="width:40px; height:40px;"
          />
        </a>
        <Dropdown show={showDropdown} items={dropdownItems} />
      </div>
    </div>
  </div>
</nav>

<!-- tab -->
{#if tabItems}
  <Tab
    on:change={handleTabChange}
    items={tabItems}
    selected={selecteTabIndex}
  />
{/if}

<!-- drawer  -->
<Drawer />

<style lang="scss">
  .resp__app-bar {
    position: relative;
    display: flex;
    top: 0;
    width: 100vw;
    z-index: 100;

    .resp__app-bar__sidebar-button {
      background-color: #fc4451;
      padding: 5px;
    }

    .resp__app-bar__container {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      width: 100%;
      min-height: 45px;

      .resp__app-bar__logo {
        align-self: center;
        img {
          display: block;
          width: 80px;
          height: calc(80px / (2567px / 601px));
          object-fit: cover;
        }
      }

      .resp__app-bar__navs {
        align-self: center;
        ul {
          display: flex;
          list-style-type: none;
          margin: 0;
          padding: 0;

          li {
            margin-right: 15px;
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

      .resp__app-bar__right {
        align-self: center;
        display: flex;

        .resp__app-bar__right-dropdown {
          position: relative;
        }
      }
    }
  }

  @media (min-width: 640px) {
    .resp__app-bar__sidebar-button {
      display: none;
    }
  }

  @media (max-width: 640px) {
    .resp__app-bar__navs,
    .resp__app-bar__right-dropdown {
      display: none;
    }
  }
</style>
