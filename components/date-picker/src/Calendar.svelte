<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { get2DimensionDate, monthNames, toDateString, weekdays } from "./datetime";

  const dispatch = createEventDispatcher();

  let className = "";
  export { className as class };
  export let year = 0;
  export let month = 0;
  export let day = 0;
  export let spanWidth = false;
  export let disabledDate = (_: Date) => false;

  let selectedMonth = month;
  let selectedYear = year;

  $: selectedMonth = month;
  $: selectedYear = year;

  const handlePrevYear = () => {
    if (selectedYear - 1 > 1970) selectedYear--;
  };

  const handleNextYear = () => {
    if (selectedYear + 1 < 9999) selectedYear++;
  };

  const handlePrevMonth = () => {
    if (selectedMonth - 1 < 0) {
      selectedYear--;
      selectedMonth = 11;
    } else {
      selectedMonth--;
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth + 1 > 11) {
      selectedYear++;
      selectedMonth = 0;
    } else {
      selectedMonth++;
    }
  };

  const handleSelectDate = (date: Date) => () => {
    dispatch("change", toDateString(date));
  };

  $: isValid = year > 0 && month >= 0 && day > 0;
  const dateClass = "resp-calendar__date";
  $: getClassList = (v: Date) => {
    const clsList: string[] = [];
    if (disabledDate(new Date(toDateString(v)))) clsList.push(`${dateClass}--disabled`);

    if (v.getMonth() != selectedMonth) {
      clsList.push(`${dateClass}--not-in-view`);
    } else if (
      isValid &&
      v.getDate() == day &&
      v.getMonth() == month &&
      v.getFullYear() == year
    ) {
      clsList.push(`${dateClass}--selected`);
    }
    return clsList.join(" ");
  };
  $: data = get2DimensionDate(selectedMonth, selectedYear);
</script>

<div
  class={`resp-calendar ${className}`}
  class:resp-calendar--span={spanWidth}
  on:click|stopPropagation
  in:fade
  out:fade
>
  <div class="resp-calendar__header">
    <span class="resp-calendar__icon" on:click={handlePrevYear}>
      <i class="resp-calendar-most-prev-icon" />
    </span>
    <span class="resp-calendar__icon" on:click={handlePrevMonth}>
      <i class="resp-calendar-prev-icon" />
    </span>
    <div class="resp-calendar__header-caption">
      {`${monthNames[selectedMonth].substring(0, 3)} ${selectedYear}`}
    </div>
    <span class="resp-calendar__icon" on:click={handleNextMonth}>
      <i class="resp-calendar-next-icon" />
    </span>
    <span class="resp-calendar__icon" on:click={handleNextYear}>
      <i class="resp-calendar-most-next-icon" />
    </span>
  </div>
  <div class="resp-calendar__body">
    <table>
      <thead>
        <tr>
          {#each weekdays as v}
            <td>{v.substring(0, 2)}</td>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each Array.from({ length: 6 }) as _, i}
          <tr>
            {#each Array.from({ length: 7 }) as _, j}
              <td
                data-date={toDateString(data[i * 7 + j])}
                on:click={handleSelectDate(data[i * 7 + j])}
              >
                <div class="resp-calendar__date {getClassList(data[i * 7 + j])}">
                  {data[i * 7 + j].getDate()}
                </div>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="resp-calendar__footer">
    <slot name="footer">
      <div class="resp-calendar__button" on:click={handleSelectDate(new Date())}>
        Today
      </div>
    </slot>
  </div>
</div>

<style lang="scss">
  $md: 768px;

  @mixin cal-span-width() {
    width: 100% !important;

    &__body {
      font-size: min(5vw, 14px);
    }

    &__header,
    &__footer {
      height: min(15vw, 36px);
      font-size: min(5vw, 14px);
    }

    &__date {
      height: min(8vw, 25px);
      width: min(8vw, 25px);
    }
  }

  @media screen and (max-width: $md) {
    div.resp-calendar {
      @include cal-span-width();
    }
  }

  .resp-calendar {
    display: flex;
    flex-direction: column;
    width: 260px;

    &--span {
      @include cal-span-width();
    }

    &__button,
    &__icon {
      cursor: pointer;
      font-family: inherit;
      margin: 0;
      background: transparent;
      border: none;
    }
    &__icon {
      width: 25px;
    }

    &__header,
    &__footer {
      display: flex;
      justify-content: center;
      height: 36px;
      padding: 0 8px;
      align-items: center;
    }

    &__header {
      text-align: center;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;
      height: max-content;
      padding: 5px 0;

      &-caption {
        flex-grow: 1;
        min-width: 0;
        text-align: center;
      }

      .resp-calendar-prev-icon,
      .resp-calendar-most-prev-icon,
      .resp-calendar-next-icon,
      .resp-calendar-most-next-icon {
        position: relative;
        display: inline-block;
        width: 7px;
        height: 7px;
      }
      .resp-calendar-prev-icon,
      .resp-calendar-most-prev-icon {
        transform: rotate(-45deg);
      }
      .resp-calendar-next-icon,
      .resp-calendar-most-next-icon {
        transform: rotate(135deg);
      }
      .resp-calendar-prev-icon::before,
      .resp-calendar-most-prev-icon::before,
      .resp-calendar-next-icon::before,
      .resp-calendar-most-next-icon::before {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 7px;
        height: 7px;
        border: 0 solid currentColor;
        border-width: 1.5px 0 0 1.5px;
        content: "";
      }
      .resp-calendar-most-prev-icon::after,
      .resp-calendar-most-next-icon::after {
        position: absolute;
        top: 4px;
        left: 4px;
        display: inline-block;
        width: 7px;
        height: 7px;
        border: 0 solid currentColor;
        border-width: 1.5px 0 0 1.5px;
        content: "";
      }
    }

    &__body {
      padding: 8px;

      table {
        table-layout: fixed;
        border-collapse: collapse;
        width: 100%;

        td {
          text-align: center;
          vertical-align: middle;
          padding: 2px 0;
        }
      }
    }

    &__date {
      cursor: pointer;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      height: 25px;
      width: 25px;
      border-radius: 50%;
      transition: all 0.3s;

      &--selected {
        background: #fc4451;
        color: #fff;
      }

      &--disabled {
        color: #a0a0a0;
      }

      &--not-in-view {
        color: #bebebe;
      }

      @media (hover) and (pointer: fine) {
        &:hover {
          background: #fc4451;
          color: #fff;
        }
      }

      @media (hover: none) and (pointer: coarse) {
        &:active {
          background: #fc4451;
          color: #fff;
        }
      }
    }

    &__footer {
      border-top: 1px solid #f5f5f5;
      justify-content: center;
    }
  }
</style>
