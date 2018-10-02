import React from "react";

import { addMonthToDate } from "../helpers/datetime";

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventMessage: "",
      date: new Date(props.year, props.month, props.dayInMonthNumber + 1),
      eventStart: "00:00",
      eventEnd: "00:00",
      useTime: false
    };
  }

  onChange = e => {
    if (e.target.name === "eventStart") {
      if (e.target.value > this.state.eventEnd) {
        return;
      }
    } else if (e.target.name === "eventEnd") {
      if (e.target.value < this.state.eventStart) {
        return;
      }
    } else if (e.target.name === "useTime") {
      this.setState({
        useTime: e.target.checked
      });
      return;
    } else if (e.target.name === "date") {
      this.setState({
        [e.target.name]: e.target.valueAsDate
      });
      return;
    }
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(e.target.value);
  };

  onSubmit = e => {
    e.preventDefault();

    const { eventMessage, date, eventStart, eventEnd, useTime } = this.state;
    //console.log(eventMessage, date, eventStart, eventEnd, useTime);
    //date.setDate(date.getDate() - 1);

    if (
      date.toDateString() ===
      new Date(
        this.props.year,
        this.props.month,
        this.props.dayInMonthNumber + 1
      ).toDateString()
    ) {
      date.setDate(date.getDate() - 1);
      this.props.onAddEvent(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        eventMessage,
        useTime,
        eventStart,
        eventEnd
      );
    } else {
      this.props.onAddEvent(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        eventMessage,
        useTime,
        eventStart,
        eventEnd
      );
    }
  };
  render() {
    const { year, month, dayInMonthNumber } = this.props;

    return (
      <div className="addEvent">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="eventMessage"
            onChange={this.onChange}
            value={this.state.eventMessage}
          />

          <input
            type="checkbox"
            name="useTime"
            id="useTime"
            onChange={this.onChange}
            value={this.state.useTime}
          />

          {this.state.useTime ? (
            <React.Fragment>
              <label htmlFor="eventStart">Start</label>
              <input
                type="time"
                id="eventStart"
                name="eventStart"
                onChange={this.onChange}
                value={this.state.eventStart}
              />
              <label htmlFor="eventEnd">End</label>
              <input
                type="time"
                id="eventEnd"
                name="eventEnd"
                onChange={this.onChange}
                value={this.state.eventEnd}
              />
            </React.Fragment>
          ) : null}

          <input
            type="date"
            name="date"
            onChange={this.onChange}
            value={this.state.date.toISOString().substr(0, 10)}
          />

          <button>AddEvent</button>
        </form>
      </div>
    );
  }
}

export default AddEvent;
