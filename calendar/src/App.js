import React, { Component } from "react";
import Month from "./components/Month";
import ChangeMonth from "./components/ChangeMonth";
import ChangeDay from "./components/ChangeDay";
import ShowTypeChecker from "./components/ShowTypeChecker";

import { addMonthToDate, subtractMonthFromDate } from "./helpers/datetime";
import { addNewEventToCalendarState } from "./helpers/state";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(Date.now()),
      events: {},
      typeView: "month"
    };
  }

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
    const events = addNewEventToCalendarState(
      this.state.events,
      year,
      month,
      dayInMonthNumber,
      eventMessage,
      useTime,
      eventStartTime,
      eventEndTime,
      annualEvent
    );

    this.setState({
      events
    });
  }; // end onAddEvent

  render() {
    return (
      <div className="App">
        <h1>Calendar</h1>
        <ShowTypeChecker
          defaultType={this.state.typeView}
          onSelectNewViewType={this.onSelectNewViewType}
        />

        {this.state.typeView === "month" ? (
          <React.Fragment>
            <ChangeMonth
              onMonthBackward={this.onMonthBackward}
              onMonthForward={this.onMonthForward}
              currentDate={this.state.currentDate}
            />
            <table className="table is-bordered is-fullwidth">
              <Month
                year={this.state.currentDate.getFullYear()}
                month={this.state.currentDate.getMonth()}
                date={this.state.currentDate}
                onAddEvent={this.onAddEvent}
                eventsState={this.state.events}
              />
            </table>
          </React.Fragment>
        ) : null}

        {this.state.typeView === "day" ? (
          <React.Fragment>
            <ChangeDay />
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

export default App;
