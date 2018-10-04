import React from "react";
import AddEvent from "./AddEvent";
import Events from "./Events";

export default class DayCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, doNotToggle: false };
  }
  toggleModal = e => {
    this.setState({ showModal: !this.state.showModal }, () => {
      this.setState({ doNotToggle: false });
    });
  };

  toggleModalByDay = () => {
    if (!this.state.doNotToggle) {
      this.setState({ showModal: true, doNotToggle: true });
    }
  };

  render() {
    const {
      eventsState,
      year,
      month,
      dayInMonthNumber,
      onAddEvent,
      typeView,
      intersectionIsDetected
    } = this.props;

    let className;
    if (eventsState && typeView === "without") {
      className = `dayCell ${this.props.className} notification is-primary`;
    } else {
      className = `dayCell ${this.props.className}`;
    }
    return (
      <td className={className} onClick={this.toggleModalByDay}>
        <p>{dayInMonthNumber}</p>
        {typeView === "with" ? <Events eventsState={eventsState} /> : null}
        <button
          className="button is-small is-fullwidth"
          onClick={this.toggleModalByDay}
        >
          Add Event
        </button>

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
