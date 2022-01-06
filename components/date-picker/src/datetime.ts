const getEmptyRows = (): unknown[] => {
  return Array.from({ length: 42 });
};

export const isLeapYear = (year: number) =>
  new Date(year, 1, 29).getDate() === 29;

export const isValidDate = (date: string) => {
  try {
    new Date(date).toISOString();
    return true;
  } catch {
    return false;
  }
};

export const monthNames = [
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

export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const toDateString = (v: Date) => {
  return `${v.getFullYear()}-${String(v.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(v.getDate()).padStart(2, "0")}`;
};

export const get2DimensionDate = (monthIndex: number, year: number): Date[] => {
  const rows = getEmptyRows();
  const startIndex = new Date(year, monthIndex, 1).getDay();
  rows.forEach((_, i) => {
    const day = i - startIndex + 1;
    rows[i] = new Date(year, monthIndex, day);
  });

  return rows as Date[];
};
