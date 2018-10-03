import React from "react";
import AddEvent from "./AddEvent";
import Events from "./Events";

const DayCell = props => {
  const { eventsState } = props;
  return (
    <td className={"dayCell " + props.className}>
      <p>{props.dayInMonthNumber}</p>
      {/* <Events eventsState={eventsState} />
      <AddEvent
        year={props.year}
        month={props.month}
        dayInMonthNumber={props.dayInMonthNumber}
        onAddEvent={props.onAddEvent}
      /> */}
    </td>
  );
};

export default DayCell;
