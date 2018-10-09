import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import store from "./store";
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
      typeView: "without"
    };
  }

  onSelectNewViewType = newViewtype => {
    this.setState({
      typeView: newViewtype
    });
  };

  render() {
    const currentDate = this.props.currentDate;

    return (
      <div className="App">
        <ShowTypeChecker
          defaultType={this.state.typeView}
          onSelectNewViewType={this.onSelectNewViewType}
        />
        <ChangeMonth />
        <SelectDate />
        <table className="table is-bordered is-narrow is-fullwidth">
          <Month
            year={currentDate.getFullYear()}
            month={currentDate.getMonth()}
            date={currentDate}
            typeView={this.state.typeView}
          />
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentDate: state.date.currentDate
  };
};

export default connect(mapStateToProps)(App);
