import React from "react";
import AddEvent from "./AddEvent";
import Events from "./Events";
import { connect } from "react-redux";

import { changeEventDate, toggleModal } from "../actions/actions";
import { getEventsState } from "../helpers/state";

import {
  TOGGLE_MODAL,
  TOGGLE_MODAL_BY_DAY,
  ADD_INITIAL_STATE_CELL
} from "../actions/types";

class DayCell extends React.Component {
  constructor(props) {
    super(props);
    this.dayCellCode = `${props.year}${props.month}${props.dayInMonthNumber}`;
  }

  toggleModal = () => {
    this.props.toggleModal();
    this.props.changeEventDate();
  };

  toggleModalByDay = () => {
    if (!this.props.doNotToggle) {
      this.props.toggleModalByDay();
    }
  };

  render() {
    const {
      year,
      month,
      dayInMonthNumber,
      typeView,
      intersectionIsDetected
    } = this.props;

    const eventsState = getEventsState(
      this.props.events,
      year,
      month,
      dayInMonthNumber
    );

    let className;
    if (eventsState && typeView === "without") {
      className = `dayCell ${this.props.className} notification is-primary`;
    } else {
      className = `dayCell ${this.props.className}`;
    }

    return (
      <td className={className} onClick={this.toggleModalByDay}>
        <p> {dayInMonthNumber} </p>
        {typeView === "with" ? <Events eventsState={eventsState} /> : null}
        <button
          className="button is-small is-fullwidth"
          onClick={this.toggleModalByDay}
        >
          Add Event
        </button>
        {this.props.dayCell.showModal ? (
          <React.Fragment>
            <div className="modal is-active">
              <div className="modal-background" />
              <div className="modal-content">
                <AddEvent
                  year={year}
                  month={month}
                  dayInMonthNumber={dayInMonthNumber}
                  intersectionIsDetected={intersectionIsDetected}
                />
              </div>
              <button
                onClick={this.toggleModal}
                className="modal-close is-large"
              />
            </div>
          </React.Fragment>
        ) : null}
      </td>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const dayCellCode = `${ownProps.year}${ownProps.month}${
    ownProps.dayInMonthNumber
  }`;
  return {
    typeView: state.typeViewReducer.typeView,
    showModal: state.dayCellReducer[dayCellCode].showModal,
    doNotToggle: state.dayCellReducer[dayCellCode].doNotToggle,
    dayCell: state.dayCellReducer[dayCellCode],
    events: state.events
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const dayCellCode = `${ownProps.year}${ownProps.month}${
    ownProps.dayInMonthNumber
  }`;
  return {
    changeEventDate: () => dispatch(changeEventDate("")),
    toggleModal: () => dispatch({ type: TOGGLE_MODAL, dayCellCode }),
    toggleModalByDay: () =>
      dispatch({
        type: TOGGLE_MODAL_BY_DAY,
        dayCellCode
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DayCell);
