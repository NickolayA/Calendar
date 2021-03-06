// month in Date object is 0 indexed range(0-11)
// day of week in Date object is 0 indexed range(0-6) 0 is Sunday
export const getFirstDayOfWeekOfMonth = (year, month) => {
  const day = new Date(year, month, 1).getDay();
  //Returns dayOfWeekOfMonth from range(1-7)
  return day % 7 === 0 ? 7 : day;
};

export const getLastDayOfWeekOfMonth = (year, month) => {
  const day = new Date(year, month + 1, 0).getDay();
  return day % 7 === 0 ? 7 : day;
};

export const getNumberOfDaysInMonth = (year, month) => {
  // month is 1-indexed
  return new Date(year, month + 1, 0).getDate();
};

export const addMonthToDate = date => {
  return new Date(new Date(date).setMonth(date.getMonth() + 1));
};

export const subtractMonthFromDate = date => {
  return new Date(new Date(date).setMonth(date.getMonth() - 1));
};

export const monthNumberToMonthName = date => {
  const monthNames = [
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
    "December"
  ];
  return monthNames[date.getMonth()];
};
