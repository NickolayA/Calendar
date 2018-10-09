import React from "react";

import { connect } from "react-redux";
import { monthForward, monthBackward } from "../actions/actions";
import { monthNumberToMonthName } from "../helpers/datetime";

const ChangeMonth = props => {
  return (
    <React.Fragment>
      <button
        className="minusMonth button is-rounded"
        onClick={() => props.monthBackward(props.currentDate)}
      >
        Backward
      </button>
      <span>{`${monthNumberToMonthName(
        props.currentDate
      )} ${props.currentDate.getFullYear()}`}</span>
      <button
        className="plusMonth button is-rounded"
        onClick={() => props.monthForward(props.currentDate)}
      >
        Forward
      </button>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return { currentDate: state.date.currentDate };
};

const mapDispatchToProps = dispatch => {
  return {
    monthForward: currentDate => dispatch(monthForward(currentDate)),
    monthBackward: currentDate => dispatch(monthBackward(currentDate))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeMonth);
