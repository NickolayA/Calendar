import React from "react";
import Week from "./Week";
import DayCell from "./DayCell";

import {
  getNumberOfDaysInMonth,
  getFirstDayOfWeekOfMonth,
  getLastDayOfWeekOfMonth,
  subtractMonthFromDate,
  addMonthToDate
} from "../helpers/datetime";

const Month = props => {
  const { year, month, date } = props;
  const numberOfDaysInMonth = getNumberOfDaysInMonth(year, month);
  const firstDayOfWeekOfMonth = getFirstDayOfWeekOfMonth(year, month);
  const lastDayOfWeekOfMonth = getLastDayOfWeekOfMonth(year, month);

  const previousMonthDate = subtractMonthFromDate(date);
  const nextMonthDate = addMonthToDate(date);
  const numberOfDaysInPreviousMonth = getNumberOfDaysInMonth(
    previousMonthDate.getFullYear(),
    previousMonthDate.getMonth()
  );

  const weeks = [];
  const days = [];

  for (
    let i = numberOfDaysInPreviousMonth - firstDayOfWeekOfMonth + 2;
    i <= numberOfDaysInPreviousMonth;
    i++
  ) {
    days.push(
      <DayCell
        className="notCurrent"
        key={"m" + (month - 1) + i}
        year={previousMonthDate.getFullYear()}
        month={previousMonthDate.getMonth()}
        dayInMonthNumber={i}
        onAddEvent={props.onAddEvent}
      />
    );
  }

  for (let i = 1; i <= numberOfDaysInMonth; i++) {
    days.push(
      <DayCell
        className="current"
        key={"m" + month + i}
        year={year}
        month={month}
        dayInMonthNumber={i}
        onAddEvent={props.onAddEvent}
      />
    );
    if (days.length === 7) {
      weeks.push(<Week>{days.slice(0)}</Week>);
      days.length = 0;
    }
  }

  for (let i = 1; i <= 7 - lastDayOfWeekOfMonth; i++) {
    days.push(
      <DayCell
        className="notCurrent"
        key={"m" + (month + 1) + i}
        year={nextMonthDate.getFullYear()}
        month={nextMonthDate.getMonth()}
        dayInMonthNumber={i}
        onAddEvent={props.onAddEvent}
      />
    );
    if (days.length === 7) {
      weeks.push(<Week>{days.slice(0)}</Week>);
      days.length = 0;
    }
  }

  return <div>{weeks}</div>;
};

export default Month;
