import React from "react";
import Week from "./Week";
import DayCell from "./DayCell";

import { connect } from "react-redux";

import { addInitialStateCell } from "../actions/actions";

import {
  getNumberOfDaysInMonth,
  getFirstDayOfWeekOfMonth,
  getLastDayOfWeekOfMonth,
  subtractMonthFromDate,
  addMonthToDate
} from "../helpers/datetime";

import { getEventsState } from "../helpers/state";

const Month = props => {
  const { year, month, eventsState, typeView, intersectionIsDetected } = props;

  const date = props.currentDate;

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
    const yearOfPreviousMonth = previousMonthDate.getFullYear();
    const monthOfPreviousMonth = previousMonthDate.getMonth();
    const eventsStateCopy = getEventsState(
      eventsState,
      yearOfPreviousMonth,
      monthOfPreviousMonth,
      i
    );
    const dayCellCode = `${yearOfPreviousMonth}${monthOfPreviousMonth}${i}`;
    props.addInitialStateCell(dayCellCode);
    days.push(
      <DayCell
        className="notCurrent"
        key={"m" + (month - 1) + i}
        year={yearOfPreviousMonth}
        month={monthOfPreviousMonth}
        dayInMonthNumber={i}
        eventsState={eventsStateCopy}
        onAddEvent={props.onAddEvent}
        typeView={typeView}
        intersectionIsDetected={intersectionIsDetected}
      />
    );
  }

  for (let i = 1; i <= numberOfDaysInMonth; i++) {
    //const index = `${year}${month}`;
    const eventsStateCopy = getEventsState(eventsState, year, month, i);

    const dayCellCode = `${year}${month}${i}`;
    props.addInitialStateCell(dayCellCode);
    days.push(
      <DayCell
        className="current"
        key={"m" + month + i}
        year={year}
        month={month}
        dayInMonthNumber={i}
        eventsState={eventsStateCopy}
        onAddEvent={props.onAddEvent}
        typeView={typeView}
        intersectionIsDetected={intersectionIsDetected}
      />
    );
    if (days.length === 7) {
      weeks.push(<Week key={weeks.length}> {days.slice(0)} </Week>);
      days.length = 0;
    }
  }

  for (let i = 1; i <= 7 - lastDayOfWeekOfMonth; i++) {
    const yearOfNextMonth = nextMonthDate.getFullYear();
    const monthOfNextMonth = nextMonthDate.getMonth();
    const eventsStateCopy = getEventsState(
      eventsState,
      yearOfNextMonth,
      monthOfNextMonth,
      i
    );
    const dayCellCode = `${yearOfNextMonth}${monthOfNextMonth}${i}`;
    props.addInitialStateCell(dayCellCode);
    days.push(
      <DayCell
        className="notCurrent"
        key={"m" + (month + 1) + i}
        year={yearOfNextMonth}
        month={monthOfNextMonth}
        dayInMonthNumber={i}
        eventsState={eventsStateCopy}
        onAddEvent={props.onAddEvent}
        typeView={typeView}
        intersectionIsDetected={intersectionIsDetected}
      />
    );
    if (days.length === 7) {
      weeks.push(<Week key={weeks.length}> {days.slice(0)} </Week>);
      days.length = 0;
    }
  }
  return <tbody> {weeks} </tbody>;
};

const mapStateToProps = state => {
  return {
    currentDate: state.date.currentDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addInitialStateCell: dayCellCode =>
      dispatch(addInitialStateCell(dayCellCode))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Month);
