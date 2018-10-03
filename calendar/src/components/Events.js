import React from "react";

const Events = props => {
  const { eventsState } = props;

  console.log(eventsState);
  return (
    <div className="events">
      <span>Events</span>
      {eventsState ? <p>Events in this day exists</p> : null}
    </div>
  );
};

export default Events;
