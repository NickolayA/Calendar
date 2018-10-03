import React from "react";

const Events = props => {
  const { eventsState } = props;

  if (eventsState) {
    console.log(eventsState, "Events", Boolean(eventsState));
  }

  return (
    <div className="events">
      <span>Events</span>
      {eventsState ? <p>Events in this day exists</p> : null}
    </div>
  );
};

export default Events;
