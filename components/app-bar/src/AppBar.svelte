<script lang="ts">
  import Scroll from "@responsive-ui/hscroll";

  export let items: any = [];
</script>

<header class="resp-app-bar" class:resp-app-bar--shadowed={true} on:click>
  <div class="resp-app-bar__box">
    <div class="resp-app-bar__main">
      <div class="resp-app-bar__leading"><slot name="leading" /></div>
      <div class="resp-app-bar__center">
        <slot name="center">
          <ul>
            {#each items as { link, label, selected, ...otherProps }}
              <li class:resp-app-bar__subnav-item--selected={selected}>
                <a href={link} {...otherProps}>{label}</a>
              </li>
            {/each}
          </ul>
        </slot>
      </div>
      <div class="resp-app-bar__trailing">
        <slot name="trailing">
          <ul>
            {#each items as { link, label, selected, ...otherProps }, index}
              <li class:resp-app-bar__subnav-item--selected={selected}>
                <slot name="trailing-item" {index} {selected}>
                  <a href={link} {...otherProps}>{label}</a>
                </slot>
              </li>
            {/each}
          </ul>
        </slot>
      </div>
    </div>
  </div>
  <!-- subnav -->
  {#if items.length > 0}
    <div class="resp-app-bar__subnav">
      <Scroll>
        <ul>
          {#each items as { link, label, selected, ...otherProps }}
            <li class:resp-app-bar__subnav-item--selected={selected}>
              <a href={link} {...otherProps}>{label}</a>
            </li>
          {/each}
        </ul>
      </Scroll>
    </div>
  {/if}
</header>

<style lang="scss" global>
  .resp-app-bar {
    position: fixed;
    display: inline-flex;
    flex-direction: column;
    top: 0;
    left: 0;
    right: 0;
    background-color: inherit;
    height: auto;
    z-index: 100;

    ul {
      list-style: none;
      list-style-position: inside;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;
      align-items: center;

      li {
        padding: 0 5px;
        white-space: nowrap;
      }
    }

    &__box {
      position: relative;
      height: 50px;
      width: 100%;
      background: #fff;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
      z-index: 500;
    }

    &__main {
      width: 80%;
      height: 100%;
      padding: 0 1rem;
      margin: 0 auto;
      align-items: center;
      display: flex;
      justify-content: space-between;

      @media screen and (max-width: 720px) {
        width: auto;
      }
    }

    &__center {
      // max-width: 40%;
      overflow: hidden;

      @media screen and (max-width: 720px) {
        display: none;
      }
    }

    &__trailing {
      ul {
        justify-content: flex-end;
      }
      @media screen and (max-width: 720px) {
        max-width: none;
        flex-grow: 1;
      }
    }

    &__subnav {
      background-color: #fc4451;
      color: #fff;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
      z-index: 450;

      &-item--selected {
        font-weight: 600;
      }

      ul {
        height: 42px;
      }

      a {
        text-decoration: none;
        color: inherit;
      }
    }

    // &--shadowed {
    //   box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
    // }
  }
</style>
