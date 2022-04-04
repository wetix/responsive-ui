<script lang="ts">
  let className = "";
  export { className as class };
  export let top = "0";
  export let side: "left" | "right" = "left";
  export let open = false;
  export let label = "Show";

  const toggle = () => {
    open = !open;
  };
</script>

<div
  class="sidebar {className}"
  class:sidebar--left={side == "left"}
  class:sidebar--right={side == "right"}
  class:sidebar--open={open}
  style="top: {top};"
  {...$$restProps}
>
  <div class="sidebar__toggle">
    <div class="sidebar__toggle-btn" on:click={toggle}>
      <p class="sidebar__toggle-label">{label}</p>
      <div class="sidebar__toggle-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="-0.5 -0.5 181 181"
        >
          <g>
            <path
              d="M 90 170 L 10 90 L 90 10"
              fill="none"
              stroke="#fc4451"
              stroke-width="20"
              stroke-miterlimit="10"
              pointer-events="stroke"
            />
            <path
              d="M 170 170 L 90 90 L 170 10"
              fill="none"
              stroke="#fc4451"
              stroke-width="20"
              stroke-miterlimit="10"
              pointer-events="stroke"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
  <div class="sidebar__content">
    <slot />
  </div>
</div>

<style lang="scss">
  .sidebar {
    position: fixed;
    display: flex;
    top: 0;
    z-index: 2;
    transition: transform 0.5s ease;

    &--left {
      flex-direction: row-reverse;
      left: 0;
      padding-left: 10px;
      transform: translateX(-58%);

      .sidebar {
        &__toggle {
          padding-left: 10px;

          &-label {
            direction: ltr;
          }

          &-icon {
            transform: rotateZ(180deg);
          }
        }
      }

      &.sidebar--open {
        transform: unset;

        .sidebar {
          &__toggle {
            &-icon {
              transform: unset;
            }
          }
        }
      }
    }

    &--right {
      flex-direction: row;
      right: 0;
      padding-right: 10px;
      transform: translateX(58%);

      .sidebar {
        &__toggle {
          padding-right: 10px;
          &-label {
            direction: rtl;
          }
        }
      }

      &.sidebar--open {
        transform: unset;
        .sidebar {
          &__toggle {
            &-icon {
              transform: rotateZ(180deg);
            }
          }
        }
      }
    }

    &__toggle-btn,
    &__content {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }

    &__toggle {
      display: block;
      z-index: 5;

      &-btn {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        width: 100px;
        border-radius: 10px;
        background-color: var(--color-white);
      }
      &-label {
        text-align: center;
      }
      &-icon {
        transition: transform 0.5s ease;
        width: 20px;
        height: 20px;
        margin-top: 10px;
      }
    }

    &__content {
      border-radius: 10px;
      background-color: var(--color-white);
      padding: var(--padding);
      width: 10rem;
      min-height: 20rem;
    }
  }
</style>
