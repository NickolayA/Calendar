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
      validationTime: true,
      validationMessage: true,
      eventMessageAdditionSuccess: false,
      addIntersectedEvent: false
    };
  }

  onChange = e => {
    if (e.target.type === "checkbox") {
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
      annualEvent,
      addIntersectedEvent
    } = this.state;
    const { year, month, dayInMonthNumber } = this.props;

    if (!eventMessage) {
      this.setState({
        validationMessage: false,
        eventMessageAdditionSuccess: false
      });
      return;
    } else {
      this.setState({ validationMessage: true });
    }

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
        annualEvent,
        addIntersectedEvent
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
        annualEvent,
        addIntersectedEvent
      );
    }

    // if (this.props.intersectionIsDetected) {
    //   this.setState({
    //     eventMessage: ""
    //   });
    // }

    this.setState({
      validationMessage: true,
      validationTime: true,
      eventMessageAdditionSuccess: true
    });
  };

  render() {
    return (
      <div className="addEvent">
        <form onSubmit={this.onSubmit}>
          <div className="field">
            <label htmlFor="eventMessage" className="label">
              Enter event name
            </label>
            <div className="control">
              <input
                type="text"
                name="eventMessage"
                id="eventMessage"
                onChange={this.onChange}
                value={this.state.eventMessage}
                placeholder="Event name"
              />
            </div>

            {!this.state.validationMessage ? (
              <p className="help is-danger">Enter event message</p>
            ) : null}
          </div>

          <div className="field">
            <div className="control">
              <label htmlFor="useTime" className="checkbox">
                <input
                  type="checkbox"
                  name="useTime"
                  id="useTime"
                  onChange={this.onChange}
                  value={this.state.useTime}
                />
                Use time
              </label>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label htmlFor="annualEvent" className="checkbox">
                <input
                  type="checkbox"
                  name="annualEvent"
                  id="annualEvent"
                  onChange={this.onChange}
                  value={this.state.annualEvent}
                />
                Select as annual event
              </label>
            </div>
          </div>

          {this.state.useTime ? (
            <React.Fragment>
              <div className="field">
                <label htmlFor="eventStart" className="label is-white">
                  Start event time
                </label>
                <div className="control">
                  <input
                    type="time"
                    id="eventStart"
                    name="eventStart"
                    onChange={this.onChange}
                    value={this.state.eventStart}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label htmlFor="eventEnd" className="label">
                    End event time
                  </label>
                  <input
                    type="time"
                    id="eventEnd"
                    name="eventEnd"
                    onChange={this.onChange}
                    value={this.state.eventEnd}
                  />
                </div>
              </div>
            </React.Fragment>
          ) : null}
          {!this.state.validationTime ? (
            <p className="help is-danger">
              Start event time greater than End event time
            </p>
          ) : null}

          <input
            type="date"
            name="date"
            onChange={this.onChange}
            value={this.state.date.toISOString().substr(0, 10)}
          />

          <div className="field">
            <div className="control">
              <button className="button is-primary">Add event</button>
            </div>
          </div>

          {this.state.eventMessageAdditionSuccess ? (
            <p className="help is-success">Event is added</p>
          ) : null}

          {this.props.intersectionIsDetected ? (
            <React.Fragment>
              <p className="help is-danger">
                There is an event at the same time.
              </p>
              <div className="field">
                <div className="control">
                  <label htmlFor="addIntersectedEvent" className="checkbox">
                    <input
                      type="checkbox"
                      name="addIntersectedEvent"
                      id="addIntersectedEvent"
                      onChange={this.onChange}
                      value={this.state.addIntersectedEvent}
                    />
                    Add anyway?
                  </label>
                </div>
              </div>
            </React.Fragment>
          ) : null}
        </form>
      </div>
    );
  }
}

export default AddEvent;
