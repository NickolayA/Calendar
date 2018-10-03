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

    if (annualEvent) {
      //const indexAnnual = index + `${dayInMonthNumber - 1}`;
      if (!("annualEvents" in events)) {
        events["annualEvents"] = {};
        events["annualEvents"][year] = {};
        events["annualEvents"][year][month] = {};
        events["annualEvents"][year][month][dayInMonthNumber - 1] = [
          eventMessage
        ];
      } else if (!(year in events["annualEvents"])) {
        events["annualEvents"][year] = {};
        events["annualEvents"][year][month] = {};
        events["annualEvents"][year][month][dayInMonthNumber - 1] = [
          eventMessage
        ];
      } else if (events["annualEvents"][year][month] === undefined) {
        events["annualEvents"][year][month] = {};
        events["annualEvents"][year][month][dayInMonthNumber - 1] = [
          eventMessage
        ];
      } else if (
        events["annualEvents"][year][month][dayInMonthNumber - 1] === undefined
      ) {
        events["annualEvents"][year][month][dayInMonthNumber - 1] = [
          eventMessage
        ];
      } else {
        events["annualEvents"][year][month][dayInMonthNumber - 1].push(
          eventMessage
        );
      }
    }
    if (!(index in events)) {
      events[index] = [];
      events[index][dayInMonthNumber - 1] = {};
    } else if (!(dayInMonthNumber - 1 in events[index])) {
      events[index][dayInMonthNumber - 1] = {};
    }

    if (
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
    } else if (!useTime || !eventStartTime) {
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
        console.log(eventStartTime, "Yes", {
          eventStartTime: [eventMessage]
        });

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
      }
    }

    this.setState({
      events
    });
  }; // end onAddEvent

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
          eventsState={this.state.events}
        />
      </div>
    );
  }
}

export default App;
