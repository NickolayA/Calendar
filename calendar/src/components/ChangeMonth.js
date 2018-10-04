import React from "react";

import { monthNumberToMonthName } from "../helpers/datetime";

const ChangeMonth = props => {
  return (
    <React.Fragment>
      <button
        className="minusMonth button is-rounded"
        onClick={props.onMonthBackward}
      >
        Backward
      </button>
      <span>{`${monthNumberToMonthName(
        props.currentDate
      )} ${props.currentDate.getFullYear()}`}</span>
      <button
        className="plusMonth button is-rounded"
        onClick={props.onMonthForward}
      >
        Forward
      </button>
    </React.Fragment>
  );
};

export default ChangeMonth;
