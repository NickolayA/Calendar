import React from "react";
import AddEvent from "./AddEvent";
import Events from "./Events";
import Modal from "./Modal";

export default class DayCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }
  toggleModal = e => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const {
      eventsState,
      year,
      month,
      dayInMonthNumber,
      onAddEvent,
      typeView
    } = this.props;

    return (
      <td className={"dayCell " + this.props.className}>
        <p>{dayInMonthNumber}</p>
        <p>{typeView}</p>
        {typeView === "with" ? <Events eventsState={eventsState} /> : null}
        <button onClick={this.toggleModal}>Add Event</button>
        {this.state.showModal ? (
          <React.Fragment>
            <div className="modal is-active">
              <div className="modal-background" />
              <div className="modal-content">
                <AddEvent
                  year={year}
                  month={month}
                  dayInMonthNumber={dayInMonthNumber}
                  onAddEvent={onAddEvent}
                  toggleModal={this.toggleModal}
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
