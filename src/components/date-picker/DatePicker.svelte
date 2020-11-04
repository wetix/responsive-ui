<script lang="ts">
  import {getAttrFromEvent} from "~/utils/dom.ts";
  import {fade} from "svelte/transition";

  export let label = "Date Picker",
    range = false,
    value = range ? [] : "",
    placeholder = "";

  const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const DAYS = [
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
    "S",
  ];
  const today = new Date(),
    nextMonthToday = new Date();
  nextMonthToday.setMonth(nextMonthToday.getMonth() + 1)
  let isOpen = true,
    month = today.getMonth(),
    year = today.getFullYear(),
    month1 = nextMonthToday.getMonth(),
    year1 = nextMonthToday.getFullYear(),
    availableDays = [],
    availableDays1 = [],
    hoveredDate = "";

  // init
  getNoOfDays();
  getNoOfDays1();

  $: isIncluded = (date) => {
    const startDate = new Date(range ? value[0] : value);
    let endDate
    if (range) {
      endDate = new Date(hoveredDate || value[1])
    } else {
      endDate = new Date(value)
    }
    return startDate < new Date(date) && new Date(date) < endDate;
  }

  $: isSelectedDay = (date, type) => {

    if (range && type === "end") {
      return value[1] === date;
    }
    if (range && type === "start") {
      return value[0] === date;
    }

    if (!range) {
      return value === date;
    }

    return false;
  }

  function onHover(e) {
    let data = getAttrFromEvent(e, "data-date");
    if (data) {
      hoveredDate = data;
    }
  }

  function onSelect(e) {
    let data = getAttrFromEvent(e, "data-date")
    if (data) {
      if (range && value.length < 2) {
        if (!value.some(el => el === data)) {
          value = [...value, data].sort((a, b) => new Date(a) - new Date(b));
        }
      } else if (range) {
        value = [data];
      } else if (!range) {
        value = data;
      }
    }

    if (range && value.length === 2) {
      isOpen = false;
    } else if (!range && value) {
      isOpen = false;
    }
  }

  function nextMonth() {
    if (month === 11) {
      year++;
      month = 0;
    } else {
      month++;
    }
    getNoOfDays();
  }

  function prevMonth() {
    if (month === 0) {
      year--;
      month = 11;
    } else {
      month--;
    }
    getNoOfDays();
  }

  function getNoOfDays() {
    let i;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // find where to start calendar day of week
    const dayOfWeek = new Date(year, month).getDay();
    const blankDaysArray = [];
    for (i = 1; i <= dayOfWeek - 1; i++) {
      // blankDaysArray.push(i);
      blankDaysArray.push("");
    }

    const daysArray = [];
    for (i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    // blankDays = blankDaysArray;
    // availableDays = daysArray;
    const days = [...blankDaysArray, ...daysArray];
    availableDays = days.reduce((arr, item, idx) => {
      const cIdx = Math.floor(idx / 7);

      if (!arr[cIdx]) {
        arr[cIdx] = [];
      }

      arr[cIdx].push(item);
      return arr;
    }, [])
  }

  function nextMonth1() {
    if (month1 === 11) {
      year1++;
      month1 = 0;
    } else {
      month1++;
    }
    getNoOfDays1();
  }

  function prevMonth1() {
    if (month1 === 0) {
      year1--;
      month1 = 11;
    } else {
      month1--;
    }
    getNoOfDays1();
  }

  function getNoOfDays1() {
    let i;
    const daysInMonth = new Date(year1, month1 + 1, 0).getDate();

    // find where to start calendar day of week
    const dayOfWeek = new Date(year1, month1).getDay();
    const blankDaysArray = [];
    for (i = 1; i <= dayOfWeek - 1; i++) {
      // blankDaysArray.push(i);
      blankDaysArray.push("");
    }

    const daysArray = [];
    for (i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    // blankDays = blankDaysArray;
    // availableDays = daysArray;
    const days = [...blankDaysArray, ...daysArray];
    availableDays1 = days.reduce((arr, item, idx) => {
      const cIdx = Math.floor(idx / 7);

      if (!arr[cIdx]) {
        arr[cIdx] = [];
      }

      arr[cIdx].push(item);
      return arr;
    }, [])
  }
</script>

<style lang="scss">
  .date-picker {
    table {
      border-spacing: 0 4px;
    }

    &--icon-calendar {
      width: 20px;
      height: 20px;
    }

    &--wrapper {
      position: relative;
    }

    &--label {
      display: block;
      color: #06002b;
      font-size: 16px;
      margin-bottom: 7px;
    }

    &--input {
      position: relative;

      input {
        cursor: default;
        max-width: 180px;
        width: 100%;
        border-radius: 2px;
        background-color: #fff;
        padding: 9px 9px 9px 40px;
        appearance: none;
        outline: none;
        text-align: left;
        overflow: visible;
        text-transform: none;
        margin: 0;
        border: solid 1px #fc4451;
        font-size: 16px;
        box-sizing: border-box;
        display: block;
      }
    }

    &--container {
      position: absolute;
      max-height: 360px;
      border-radius: 10px;
      box-shadow: 0 0 13px -4px rgba(0, 0, 0, 0.2);

      .date-picker--panels {
        display: inline-flex;
        max-width: 650px;
        width: 100%;
      }

      .date-picker--panel {
        padding: 16px;
        max-width: 300px;
      }

      .date-picker--header {
        display: flex;
        align-items: center;
        margin-bottom: 16px;

        .date-picker--buttons {
          flex: 0 0 50%;
          max-width: 50%;
          width: 100%;
          text-align: right;

          button {
            display: inline-flex;
            padding: 4px;
            background-color: transparent;
            border: none;
            border-radius: 50%;
            cursor: pointer;

            &:hover {
              background-color: #dbdbdb;
            }
          }

          svg {
            height: 20px;
            width: 20px;
            display: inline-flex;
            color: #fc4451;
          }
        }

        .date-picker--month-year {
          flex: 0 0 50%;
          max-width: 50%;
          width: 100%;

          span {
            font-size: 16px;
          }
        }
      }

      .date-picker--body {
        .date-picker--day,
        .date-picker--date {
          width: 34px;
          height: 34px;
          text-align: center;
          color: #9e9e9e;
        }

        .date-picker--date {
          position: relative;

          span {
            user-select: none;
          }

          &-start,
          &-end {
            color: #fff;
          }

          &-start {
            background: linear-gradient(90deg, transparent 50%, #feedee 0);
          }

          &-end {
            background: linear-gradient(90deg, #feedee 50%, transparent 50%);
          }

          &-start::before,
          &-end::before {
            content: "";
            position: absolute;
            border-radius: 50%;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            height: inherit;
            background-color: #fc4451;
          }

          &:not(.date-picker--date-start):not(.date-picker--date-end):hover,
          &-included {
            background-color: #feedee;
            color: #272a39;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>

<div class="date-picker">
  <div class="date-picker--wrapper">
    <label class="date-picker--label">
      {label}
    </label>
    <div class="date-picker--input" on:click={() => {isOpen = !isOpen}}>
      <div style="position:absolute;top:0;bottom:0;left:0;padding:7px 10px;">
        <svg
            class="date-picker--icon-calendar"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
          <path
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
          />
        </svg>
      </div>
      <input {placeholder} readonly {value}/>
    </div>

    {#if isOpen}
      <div class="date-picker--container"
           transition:fade="{{ duration: 150 }}">
        {#if !range}
          <div
              class="date-picker--panel"
          >
            <div class="date-picker--header">
              <div class="date-picker--month-year">
                        <span>
                            {MONTH_NAMES[month]} {year}
                        </span>
              </div>
              <div class="date-picker--buttons">
                <button
                    type="button"
                    on:click="{prevMonth}"
                >
                  <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                    type="button"
                    on:click="{nextMonth}"
                >
                  <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="date-picker--body">
              <table>
                <thead>
                <tr>
                  {#each DAYS as day}
                    <th class="date-picker--day">{day}</th>
                  {/each}
                </tr>
                </thead>
                <tbody on:click={onSelect}>
                {#each availableDays as dateRow}
                  <tr style="margin-bottom: 6px">
                    {#each dateRow as date}
                      <td
                          class:date-picker--date-selected={isSelectedDay(`${year}-${month + 1}-${date}`)}
                          class="date-picker--date"
                          on:mouseenter={range ? onHover : null}
                          on:mouseleave={() => {hoveredDate = ""}}
                          data-date="{`${year}-${month + 1}-${date}`}"
                      >
                        <span style="position:relative;">{date}</span>
                      </td>
                    {/each}
                  </tr>
                {/each}
                </tbody>
              </table>
            </div>
          </div>
        {:else}
          <div class="date-picker--panels">
            <div
                class="date-picker--panel"
            >
              <div class="date-picker--header">
                <div class="date-picker--month-year">
                        <span>
                            {MONTH_NAMES[month]} {year}
                        </span>
                </div>
                <div class="date-picker--buttons">
                  <button
                      type="button"
                      on:click="{prevMonth}"
                  >
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                      type="button"
                      on:click="{nextMonth}"
                  >
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="date-picker--body">
                <table>
                  <thead>
                  <tr>
                    {#each DAYS as day}
                      <th class="date-picker--day">{day}</th>
                    {/each}
                  </tr>
                  </thead>
                  <tbody on:click={onSelect}>
                  {#each availableDays as dateRow}
                    <tr style="margin-bottom: 6px">
                      {#each dateRow as date}
                        <td
                            class:date-picker--date-included={isIncluded(`${year}-${month + 1}-${date}`)}
                            class:date-picker--date-selected={isSelectedDay(`${year}-${month + 1}-${date}`)}
                            class:date-picker--date-start={isSelectedDay(`${year}-${month + 1}-${date}`, "start")}
                            class:date-picker--date-end={isSelectedDay(`${year}-${month + 1}-${date}`, "end")}
                            class="date-picker--date"
                            on:mouseenter={range ? onHover : null}
                            on:mouseleave={() => {hoveredDate = ""}}
                            data-date="{`${year}-${month + 1}-${date}`}"
                        >
                          <span style="position:relative;">{date}</span>
                        </td>
                      {/each}
                    </tr>
                  {/each}
                  </tbody>
                </table>
              </div>
            </div>

            <div
                class="date-picker--panel"
            >
              <div class="date-picker--header">
                <div class="date-picker--month-year">
                        <span>
                            {MONTH_NAMES[month1]} {year1}
                        </span>
                </div>
                <div class="date-picker--buttons">
                  <button
                      type="button"
                      on:click="{prevMonth1}"
                  >
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                      type="button"
                      on:click="{nextMonth1}"
                  >
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                      <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="date-picker--body">
                <table>
                  <thead>
                  <tr>
                    {#each DAYS as day}
                      <th class="date-picker--day">{day}</th>
                    {/each}
                  </tr>
                  </thead>
                  <tbody on:click={onSelect}>
                  {#each availableDays1 as dateRow}
                    <tr style="margin-bottom: 6px">
                      {#each dateRow as date}
                        <td
                            class:date-picker--date-included={isIncluded(`${year1}-${month1 + 1}-${date}`)}
                            class:date-picker--date-selected={isSelectedDay(`${year1}-${month1 + 1}-${date}`)}
                            class:date-picker--date-start={isSelectedDay(`${year1}-${month1 + 1}-${date}`, "start")}
                            class:date-picker--date-end={isSelectedDay(`${year1}-${month1 + 1}-${date}`, "end")}
                            class="date-picker--date"
                            on:mouseenter={range ? onHover : null}
                            on:mouseleave={() => {hoveredDate = ""}}
                            data-date="{`${year1}-${month1 + 1}-${date}`}"
                        >
                          <span style="position:relative;">{date}</span>
                        </td>
                      {/each}
                    </tr>
                  {/each}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>
<!-- markup (zero or more items) goes here -->
