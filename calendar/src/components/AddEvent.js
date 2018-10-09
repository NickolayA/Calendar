import React from "react";
import { connect } from "react-redux";

import {
  SET_MESSAGE_ADDITION_SUCCESS,
  RESET_MESSAGE_ADDITION_SUCCESS,
  CHANGE_ADD_INTERSECTED_EVENT
} from "../actions/types";

import {
  changeEventMessage,
  changeEventDate,
  changeEventStartTime,
  changeEventEndTime,
  changeUseTime,
  changeAnnualEvent,
  changeValidationTime,
  changeValidationMessage,
  addEvent
} from "../actions/actions";

class AddEvent extends React.Component {
  onSubmit = e => {
    e.preventDefault();

    const {
      eventMessage,
      eventDate,
      eventStart,
      eventEnd,
      useTime,
      annualEvent,
      addIntersectedEvent
    } = this.props;

    const { year, month, dayInMonthNumber } = this.props;

    if (!eventMessage) {
      this.props.changeValidationMessage(false);
      this.props.setResetEventMessageAdditionSuccess(
        RESET_MESSAGE_ADDITION_SUCCESS
      );

      return;
    } else {
      this.props.changeValidationMessage(true);
    }

    if (eventStart && eventEnd && eventStart > eventEnd) {
      this.props.changeValidationTime(false);
      return;
    } else {
      this.props.changeValidationTime(true);
    }

    if (
      eventDate.toDateString() ===
      new Date(year, month, dayInMonthNumber + 1).toDateString()
    ) {
      this.props.setEventDate(
        new Date(eventDate.setDate(eventDate.getDate() - 1))
      );

      this.props.addNewEvent(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        eventMessage,
        useTime,
        eventStart,
        eventEnd,
        annualEvent,
        // this.props.onEventsIntersectionDetection,
        addIntersectedEvent
      );

      this.props.setEventDate(
        new Date(eventDate.setDate(eventDate.getDate() + 1))
      );
    } else {
      this.props.addNewEvent(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        eventMessage,
        useTime,
        eventStart,
        eventEnd,
        annualEvent,
        // this.props.onEventsIntersectionDetection,
        addIntersectedEvent
      );
    }

    this.props.changeValidationMessage(true);
    this.props.changeValidationTime(true);
    this.props.setResetEventMessageAdditionSuccess(
      SET_MESSAGE_ADDITION_SUCCESS
    );

    // this.setState({
    //   eventMessageAdditionSuccess: true
    // });
  };

  render() {
    let eventDate;
    if (!this.props.eventDate) {
      eventDate = new Date(
        this.props.year,
        this.props.month,
        this.props.dayInMonthNumber + 1
      );
      this.props.setEventDate(eventDate);
    } else {
      eventDate = this.props.eventDate;
    }

    return (
      <div className="addEvent">
        <form onSubmit={this.onSubmit}>
          <div className="field">
            <label htmlFor="eventMessage" className="label">
              Enter event name{" "}
            </label>{" "}
            <div className="control">
              <input
                type="text"
                name="eventMessage"
                id="eventMessage"
                onChange={this.props.changeEventMessage}
                value={this.props.eventMessage}
                placeholder="Event name"
              />
            </div>{" "}
            {!this.props.validationMessage ? (
              <p className="help is-danger"> Enter event message </p>
            ) : null}{" "}
          </div>{" "}
          <div className="field">
            <div className="control">
              <label htmlFor="useTime" className="checkbox">
                <input
                  type="checkbox"
                  name="useTime"
                  id="useTime"
                  onChange={this.props.changeUseTime}
                  value={this.props.useTime}
                />
                Use time{" "}
              </label>{" "}
            </div>{" "}
          </div>{" "}
          <div className="field">
            <div className="control">
              <label htmlFor="annualEvent" className="checkbox">
                <input
                  type="checkbox"
                  name="annualEvent"
                  id="annualEvent"
                  onChange={this.props.changeAnnualEvent}
                  value={this.props.annualEvent}
                />
                Select as annual event
              </label>
            </div>
          </div>
          {this.props.useTime ? (
            <React.Fragment>
              <div className="field">
                <label htmlFor="eventStart" className="label is-white">
                  Start event time{" "}
                </label>{" "}
                <div className="control">
                  <input
                    type="time"
                    id="eventStart"
                    name="eventStart"
                    onChange={this.props.changeEventStartTime}
                    value={this.props.eventStart}
                    required
                  />
                </div>{" "}
              </div>{" "}
              <div className="field">
                <div className="control">
                  <label htmlFor="eventEnd" className="label">
                    End event time{" "}
                  </label>{" "}
                  <input
                    type="time"
                    id="eventEnd"
                    name="eventEnd"
                    onChange={this.props.changeEventEndTime}
                    value={this.props.eventEnd}
                  />{" "}
                </div>{" "}
              </div>{" "}
            </React.Fragment>
          ) : null}{" "}
          {!this.props.validationTime ? (
            <p className="help is-danger">
              Start event time greater than End event time{" "}
            </p>
          ) : null}{" "}
          <input
            type="date"
            name="date"
            onChange={this.props.changeEventDate}
            value={eventDate.toISOString().substr(0, 10)}
            required
          />
          <div className="field">
            <div className="control">
              <button className="button is-primary"> Add event </button>{" "}
            </div>{" "}
          </div>{" "}
          {this.props.eventMessageAdditionSuccess ? (
            <p className="help is-success"> Event is added </p>
          ) : null}{" "}
          {this.props.eventIntersectionDetected ? (
            <React.Fragment>
              <p className="help is-danger">
                There is an event at the same time.{" "}
              </p>
              <div className="field">
                <div className="control">
                  <label htmlFor="addIntersectedEvent" className="checkbox">
                    <input
                      type="checkbox"
                      name="addIntersectedEvent"
                      id="addIntersectedEvent"
                      onChange={this.props.changeAddIntersectedEvent}
                      value={this.props.addIntersectedEvent}
                    />
                    Add anyway ?
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

const mapStateToProps = (state, ownProps) => {
  return {
    eventMessage: state.addEventReducer.eventMessage,
    eventDate: state.addEventReducer.eventDate,
    eventStart: state.addEventReducer.eventStart,
    eventEnd: state.addEventReducer.eventEnd,
    useTime: state.addEventReducer.useTime,
    annualEvent: state.addEventReducer.annualEvent,
    validationTime: state.addEventReducer.validationTime,
    validationMessage: state.addEventReducer.validationMessage,
    addIntersectedEvent: state.events.addIntersectedEvent,
    eventMessageAdditionSuccess:
      state.addEventReducer.eventMessageAdditionSuccess,
    eventIntersectionDetected: state.events.eventIntersectionDetected
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeAddIntersectedEvent: e =>
      dispatch({
        type: CHANGE_ADD_INTERSECTED_EVENT,
        payload: e.target.checked
      }),
    setEventDate: newEventDate => dispatch(changeEventDate(newEventDate)),
    changeEventMessage: e => dispatch(changeEventMessage(e.target.value)),
    changeEventDate: e => dispatch(changeEventDate(e.target.valueAsDate)),
    changeEventStartTime: e => dispatch(changeEventStartTime(e.target.value)),
    changeEventEndTime: e => dispatch(changeEventEndTime(e.target.value)),
    changeUseTime: e => dispatch(changeUseTime(e.target.checked)),
    changeAnnualEvent: e => dispatch(changeAnnualEvent(e.target.checked)),
    changeValidationTime: newValidationTime =>
      dispatch(changeValidationTime(newValidationTime)),
    changeValidationMessage: newValidationMessage =>
      dispatch(changeValidationMessage(newValidationMessage)),
    setResetEventMessageAdditionSuccess: type => dispatch({ type: type }),
    setResetAddIntersectedEvent: type => dispatch({ type: type }),
    addNewEvent: (
      year,
      month,
      dayInMonthNumber,
      eventMessage,
      useTime,
      eventStartTime,
      eventEndTime,
      annualEvent,
      addIntersectedEvent
      // onEventsIntersectionDetection
    ) =>
      dispatch(
        addEvent(
          year,
          month,
          dayInMonthNumber,
          eventMessage,
          useTime,
          eventStartTime,
          eventEndTime,
          annualEvent,
          addIntersectedEvent
          // onEventsIntersectionDetection
        )
      ),
    onEventsIntersectionDetection: () => dispatch({ type: "Hello world" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEvent);
