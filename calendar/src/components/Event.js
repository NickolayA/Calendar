import React from "react";

const Event = props => {
  const { eventMessage, eventType, startTime, endTime } = props;
  if (startTime && endTime === undefined) {
    return (
      <p className="is-small">
        {startTime}-{eventMessage}
      </p>
    );
  } else if (startTime && endTime) {
    return (
      <p className="is-small">
        {startTime}-{endTime}-{eventMessage}
      </p>
    );
  } else {
    return (
      <p className="is-small">
        {eventMessage}-{eventType}
      </p>
    );
  }
};

export default Event;
