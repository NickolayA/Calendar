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
    index,
    eventMessage,
    useTime,
    startTime,
    endTime
  ) => {
    console.log("Add Event");
    console.log(year, month, index, eventMessage, useTime, startTime, endTime);
    this.setState({
      events: { a: 232, month: month }
    });
    // console.log(year, month, index, eventMessage, useTime, startTime, endTime);
    // console.log(this.state.events);
    // this.setState(prevState => {
    //   const dateIndex = `${year}${month}`;
    //   const events = prevState.events;
    //   if (dateIndex in events) {
    //     var eventsAtCurrentDate = [...events[dateIndex]];
    //     eventsAtCurrentDate[index] = 100;
    //     events[dateIndex] = eventsAtCurrentDate;
    //   } else {
    //     events[dateIndex] = [];
    //   }
    //   return {
    //     events
    //   };
    // });
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
