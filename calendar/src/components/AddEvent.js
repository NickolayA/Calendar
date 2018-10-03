import React from "react";

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventMessage: "",
      date: new Date(props.year, props.month, props.dayInMonthNumber + 1),
      eventStart: "",
      eventEnd: "",
      useTime: false,
      annualEvent: false,
      validationTime: true
    };
  }

  onChange = e => {
    if (e.target.name === "useTime" || e.target.name === "annualEvent") {
      console.log("annual evnet");
      this.setState({
        [e.target.name]: e.target.checked
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
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      eventMessage,
      date,
      eventStart,
      eventEnd,
      useTime,
      annualEvent
    } = this.state;
    const { year, month, dayInMonthNumber } = this.props;

    if (!eventMessage) return;

    if (eventStart && eventEnd && eventStart > eventEnd) {
      this.setState({
        validationTime: false
      });
      return;
    } else {
      this.setState({
        validationTime: true
      });
    }

    if (
      date.toDateString() ===
      new Date(year, month, dayInMonthNumber + 1).toDateString()
    ) {
      date.setDate(date.getDate() - 1);
      this.props.onAddEvent(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        eventMessage,
        useTime,
        eventStart,
        eventEnd,
        annualEvent
      );
      date.setDate(date.getDate() + 1);
    } else {
      this.props.onAddEvent(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        eventMessage,
        useTime,
        eventStart,
        eventEnd,
        annualEvent
      );
    }

    this.setState({
      eventMessage: ""
    });
    this.props.toggleModal();
  };

  render() {
    return (
      <div className="addEvent">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="eventMessage"
            onChange={this.onChange}
            value={this.state.eventMessage}
          />

          <label htmlFor="useTime">Use time</label>
          <input
            type="checkbox"
            name="useTime"
            id="useTime"
            onChange={this.onChange}
            value={this.state.useTime}
          />

          <label htmlFor="annualEvent">Check as annual event</label>
          <input
            type="checkbox"
            name="annualEvent"
            id="annualEvent"
            onChange={this.onChange}
            value={this.state.annualEvent}
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

          {!this.state.validationTime ? (
            <h1>Start event time greater than End event time</h1>
          ) : null}
          <button>AddEvent</button>
        </form>
      </div>
    );
  }
}

export default AddEvent;
