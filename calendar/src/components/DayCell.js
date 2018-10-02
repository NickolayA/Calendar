import React from "react";
import AddEvent from "./AddEvent";

const DayCell = props => {
  return (
    <div className={"dayCell " + props.className}>
      <p>{props.dayInMonthNumber}</p>
      <AddEvent
        year={props.year}
        month={props.month}
        dayInMonthNumber={props.dayInMonthNumber}
        onAddEvent={props.onAddEvent}
      />
    </div>
  );
};

export default DayCell;
