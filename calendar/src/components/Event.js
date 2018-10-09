import React from "react";

const Event = props => {
  const { eventMessage, eventType, startTime, endTime } = props;
  let event;

  if (startTime && endTime === undefined) {
    event = (
      <a className="panel-block event onlyStartTime">
        {" "}
        {startTime}: {eventMessage}{" "}
      </a>
    );
  } else if (startTime && endTime) {
    event = (
      <a className="panel-block event rangeTime">
        {" "}
        {startTime} - {endTime}: {eventMessage}{" "}
      </a>
    );
  } else {
    if (eventType === "annualEvents") {
      event = (
        <a
          className="panel-block event annualEvents is-danger"
          title="annual event"
        >
          {eventMessage}{" "}
        </a>
      );
    } else {
      event = (
        <a className="panel-block event notUsingTime"> {eventMessage} </a>
      );
    }
  }

  return event;
};

export default Event;
