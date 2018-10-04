import React from "react";

const Event = props => {
  const { eventMessage, eventType, startTime, endTime } = props;
  if (startTime && endTime === undefined) {
    return (
      <div>
        {startTime}-{eventMessage}
      </div>
    );
  } else if (startTime && endTime) {
    return (
      <div>
        {startTime}-{endTime}-{eventMessage}
      </div>
    );
  } else {
    return (
      <div>
        {eventMessage}-{eventType}
      </div>
    );
  }
};

export default Event;
