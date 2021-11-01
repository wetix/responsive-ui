<script lang="ts">
  import { onDestroy, createEventDispatcher } from "svelte";

  import Icon from "../../icon/src/Icon.svelte";
  import Badge from "../../badge/src/Badge.svelte";
  import Tab from "../components/Tab.svelte";

  type CenterItem = {
    value: string;
    link: string;
  };

  type DropdownItem = {
    value: string;
    icon: string;
    link: string;
  };

  type TabItem = {
    title: string;
    value: string;
  };

  export let tabItems: TabItem[];
  export let selecteTabIndex = 0;
  export let centerItems: CenterItem[];
  export let dropdownItems: DropdownItem[];

  centerItems = [
    { value: "Movie", link: "/movie" },
    { value: "Store", link: "/store" },
    { value: "Blog", link: "https://articles.wetix.my/" },
    // { value: "Promotion", link: "/promotion" },
  ];

  dropdownItems = [
    { value: "Profile", icon: "profile", link: `/store/me` },
    {
      value: "Purchase History",
      icon: "history",
      link: `/store/me/purchase-history`,
    },
    // { value: "My Tickets", icon: "ticket" },
    // { value: "My Vouchers", icon: "voucher" },
    // { value: "Loyalty", icon: "loyalty" },
    // { value: "Settings", icon: "settings" },
    { value: "Logout", icon: "logout", link: `/logout` },
  ];

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

  $: if (width) {
    sideBar.style.transition = "none";
    sideBar.style.left = `-${width}px`;
  }
</script>

<svelte:window bind:innerWidth={width} />

<nav>
  <div class="app-bar">
    <!-- side-bar button -->
    <div class="app-bar__sidebar-button" on:click={onOpenSidebar}>
      <Icon
        type="hamburger"
        style="width:35px; height:35px;"
        on:click={onOpenSidebar}
      />
    </div>

    <!-- container -->
    <div class="app-bar__container">
      <!-- left-->
      <div class="app-bar__left">
        <a href="/store">
          <img src={logoSrc} alt="logo" />
        </a>
      </div>

      <!-- center -->
      <div class="app-bar__center">
        <ul>
          {#each centerItems as item}
            <li><a href={item.link}>{item.value}</a></li>
          {/each}
        </ul>
      </div>

      <!-- right -->
      <div class="app-bar__right">
        <div class="app-bar__buttons">
          <a href={`/store/cart`} title="Cart" class="app-bar__button">
            <Badge count={0}>
              <Icon type="cart" style="width:40px; height:40px" />
            </Badge>
          </a>

          <div
            title="Profile"
            class="app-bar__button"
            on:click|stopPropagation={toggleShowDropdown}
          >
            <Icon type="profile" style="width:40px; height:40px" />
            <div class="app-bar__dropdown" class:hide={!showDropdown}>
              <div class="app-bar__user">
                <div class="app-bar__user-text">Signed in as:</div>
                <div class="app-bar__user-name">
                  {"John Doe"}
                </div>
              </div>
              <ul>
                {#each dropdownItems as item}
                  <li>
                    <a href={item.link}>
                      <span style="margin-right:5px;">
                        <Icon
                          style="width:40px; height:40px"
                          type={item.icon}
                        /></span
                      >
                      <span>
                        {item.value}
                      </span>
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {#if tabItems}
    <Tab
      on:change={handleTabChange}
      items={tabItems}
      selected={selecteTabIndex}
    />
  {/if}
</nav>

<!-- sidebar -->
<nav class="side-bar" bind:this={sideBar}>
  <div class="side-bar__header">
    <div class="side-bar__left">
      <Icon type="hamburger" style="width:40px; height:40px" />
      <span style="margin-left:10px;">MENU</span>
    </div>
    <div class="side-bar__right">
      <span class="side-bar__button" on:click={onCloseSidebar}>
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
  nav {
    position: fixed;
    width: 100vw;
    z-index: 100;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);

    .app-bar {
      display: flex;

      background-color: #ffffff;

      .app-bar__sidebar-button {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fc4451;
        padding: 5px;

        @media (min-width: 640px) {
          display: none;
        }
      }

      .app-bar__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 40px 10px 40px;
        width: 100%;
        @media (max-width: 640px) {
          padding: 5px 5px 5px 15px;
        }

        .app-bar__left {
          margin-right: 15px;
          img {
            width: 80px;
            height: calc(80px / (2567px / 601px));
            object-fit: cover;
          }
        }

        .app-bar__center {
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

          @media (max-width: 640px) {
            display: none;
          }
        }

        .app-bar__right {
          position: relative;
          display: flex;

          .app-bar__buttons {
            display: flex;
            .app-bar__button {
              position: relative;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 10px;

              .app-bar__dropdown {
                position: absolute;
                z-index: 105;
                right: 0;
                top: 100%;
                background-color: #ffffff;
                border-radius: 6px;
                box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
                max-width: 200px;

                .app-bar__user {
                  padding: 15px;
                  cursor: default;
                  .app-bar__user-text {
                    color: #444444;
                    font-size: 0.813rem;
                  }

                  .app-bar__user-name {
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
            }
          }
        }
      }
    }
  }

  .side-bar {
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
