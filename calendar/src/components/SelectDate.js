import React from "react";
import { connect } from "react-redux";
import { changeDate } from "../actions/actions";

const SelectDate = props => {
  return (
    <input
      type="month"
      value={props.currentDate.toISOString().substr(0, 7)}
      onChange={e => props.changeDate(e)}
    />
  );
};

const mapStateToProps = state => {
  return {
    currentDate: state.date.currentDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeDate: e => {
      const newDate = e.target.valueAsDate;
      if (newDate) {
        dispatch(changeDate(e.target.valueAsDate));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDate);
