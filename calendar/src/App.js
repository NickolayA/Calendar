import React, { Component } from "react";
import Month from "./components/Month";
import ChangeMonth from "./components/ChangeMonth";
import ShowTypeChecker from "./components/ShowTypeChecker";
import SelectDate from "./components/SelectDate";

import { addMonthToDate, subtractMonthFromDate } from "./helpers/datetime";
import { addNewEventToCalendarState } from "./helpers/state";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(Date.now()),
      events: {},
      typeView: "without",
      eventsIntersectionIsDetected: false
    };
  }

  onChangeDate = e => {
    this.setState({
      currentDate: e.target.valueAsDate
    });
  };

  onSelectNewViewType = newViewtype => {
    this.setState({
      typeView: newViewtype
    });
  };

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

  onEventsIntersectionDetection = (message, changeMessage) => {
    this.setState({
      eventsIntersectionIsDetected: changeMessage
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
    annualEvent,
    addIntersectedEvent
  ) => {
    const events = addNewEventToCalendarState(
      this.state.events,
      year,
      month,
      dayInMonthNumber,
      eventMessage,
      useTime,
      eventStartTime,
      eventEndTime,
      annualEvent,
      this.onEventsIntersectionDetection,
      addIntersectedEvent
    );

    this.setState({
      events
    });
  }; // end onAddEvent

  render() {
    return (
      <div className="App">
        <ShowTypeChecker
          defaultType={this.state.typeView}
          onSelectNewViewType={this.onSelectNewViewType}
        />
        <ChangeMonth
          onMonthBackward={this.onMonthBackward}
          onMonthForward={this.onMonthForward}
          currentDate={this.state.currentDate}
        />
        <SelectDate
          date={this.state.currentDate}
          onChangeDate={this.onChangeDate}
        />
        <table className="table is-bordered is-narrow is-fullwidth">
          <Month
            year={this.state.currentDate.getFullYear()}
            month={this.state.currentDate.getMonth()}
            date={this.state.currentDate}
            onAddEvent={this.onAddEvent}
            eventsState={this.state.events}
            typeView={this.state.typeView}
            intersectionIsDetected={this.state.eventsIntersectionIsDetected}
          />
        </table>
      </div>
    );
  }
}

export default App;
