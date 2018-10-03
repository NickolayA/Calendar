import React, { Component } from "react";
import Month from "./components/Month";
import ChangeMonth from "./components/ChangeMonth";

import { addMonthToDate, subtractMonthFromDate } from "./helpers/datetime";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentDate: new Date(Date.now()), events: {} };
  }
  onMonthForward = () => {
    this.setState({
      currentDate: addMonthToDate(this.state.currentDate)
    });
  };

  onMonthBackward = () => {
    this.setState({
      currentDate: subtractMonthFromDate(this.state.currentDate)
    });
  };

  onAddEvent = (
    year,
    month,
    dayInMonthNumber,
    eventMessage,
    useTime,
    eventStartTime,
    eventEndTime,
    annualEvent
  ) => {
    console.log(
      year,
      month,
      dayInMonthNumber,
      eventMessage,
      useTime,
      eventStartTime,
      eventEndTime,
      annualEvent
    );
    const events = this.state.events;
    const index = `${year}${month}`;

    if (!(index in events)) {
      events[index] = [];
      events[index][dayInMonthNumber - 1] = {};
    }

    if (annualEvent) {
      console.log("Annual event");
    } else if (!useTime) {
      if (!("notUsingTime" in events[index][dayInMonthNumber - 1])) {
        events[index][dayInMonthNumber - 1]["notUsingTime"] = [eventMessage];
      } else {
        events[index][dayInMonthNumber - 1]["notUsingTime"].push(eventMessage);
      }
    } else {
      if (
        !("eventStartTime" in events[index][dayInMonthNumber - 1]) &&
        !eventEndTime
      ) {
        console.log(eventStartTime, "Yes", { eventStartTime: [eventMessage] });

        events[index][dayInMonthNumber - 1]["eventStartTime"] = {};
        events[index][dayInMonthNumber - 1]["eventStartTime"][
          eventStartTime
        ] = [eventMessage];
      } else if (
        "eventStartTime" in events[index][dayInMonthNumber - 1] &&
        !eventEndTime
      ) {
        if (
          !(
            eventStartTime in
            events[index][dayInMonthNumber - 1]["eventStartTime"]
          )
        ) {
          events[index][dayInMonthNumber - 1]["eventStartTime"][
            eventStartTime
          ] = [eventMessage];
        } else {
          events[index][dayInMonthNumber - 1]["eventStartTime"][
            eventStartTime
          ].push(eventMessage);
        }
      } else if (
        eventStartTime &&
        eventEndTime &&
        !("rangeTime" in events[index][dayInMonthNumber - 1])
      ) {
        events[index][dayInMonthNumber - 1]["rangeTime"] = {};
        events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime] = {};
        events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime][
          eventEndTime
        ] = [eventMessage];
      } else if (
        eventStartTime &&
        eventEndTime &&
        "rangeTime" in events[index][dayInMonthNumber - 1]
      ) {
        if (
          !(eventStartTime in events[index][dayInMonthNumber - 1]["rangeTime"])
        ) {
          events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime] = {};
          events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime][
            eventEndTime
          ] = [eventMessage];
        } else if (
          eventStartTime in events[index][dayInMonthNumber - 1]["rangeTime"]
        ) {
          if (
            !(
              eventEndTime in
              events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime]
            )
          ) {
            events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime][
              eventEndTime
            ] = {};
            events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime][
              eventEndTime
            ] = [eventMessage];
          } else {
            events[index][dayInMonthNumber - 1]["rangeTime"][eventStartTime][
              eventEndTime
            ].push(eventMessage);
          }
        }
      }
    }

    this.setState({
      events
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Calendar</h1>
        <ChangeMonth
          onMonthBackward={this.onMonthBackward}
          onMonthForward={this.onMonthForward}
          currentDate={this.state.currentDate}
        />
        <Month
          year={this.state.currentDate.getFullYear()}
          month={this.state.currentDate.getMonth()}
          date={this.state.currentDate}
          onAddEvent={this.onAddEvent}
        />
      </div>
    );
  }
}

export default App;
