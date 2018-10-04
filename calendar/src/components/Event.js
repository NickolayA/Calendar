import React from "react";

const Event = props => {
  const { eventMessage, eventType, startTime, endTime } = props;
  console.log(eventType, "Event TYpe");
  if (startTime && endTime === undefined) {
    return (
      <a className="panel-block event onlyStartTime">
        {startTime}-{eventMessage}
      </a>
    );
  } else if (startTime && endTime) {
    return (
      <a className="panel-block event rangeTime">
        {startTime}-{endTime}-{eventMessage}
      </a>
    );
  } else {
    if (eventType === "annualEvents") {
      return (
        <a
          className="panel-block event annualEvents is-danger"
          title="annual event"
        >
          {eventMessage}
        </a>
      );
    } else {
      return <a className="panel-block event notUsingTime">{eventMessage}</a>;
    }
  }
};

export default Event;
