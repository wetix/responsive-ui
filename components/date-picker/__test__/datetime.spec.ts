import { isLeapYear, toDateString } from "../src/datetime";

test("Test isLeapYear", () => {
  expect(isLeapYear(2000)).toBeTruthy();
  expect(isLeapYear(2020)).toBeTruthy();
  expect(isLeapYear(2028)).toBeTruthy();
  expect(isLeapYear(2032)).toBeTruthy();

  for (let i = 2001; i < 20; i++) {
    expect(isLeapYear(i)).toBeFalsy();
  }
});

test("Test toDateString", () => {
  expect(toDateString(new Date(2021, 0, 1))).toBe("2021-01-01");
  expect(toDateString(new Date(2021, 1, 13))).toBe("2021-02-13");
  expect(toDateString(new Date(2021, 10, 1))).toBe("2021-11-01");
  expect(toDateString(new Date(2021, 3, 25))).toBe("2021-04-25");
});
