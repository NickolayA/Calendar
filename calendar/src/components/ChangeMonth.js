import React from "react";

const ChangeMonth = props => {
  return (
    <React.Fragment>
      <button className="minusMonth" onClick={props.onMonthBackward}>
        Backward
      </button>
      <span>{props.currentDate.toDateString()}</span>
      <button className="plusMonth" onClick={props.onMonthForward}>
        Forward
      </button>
    </React.Fragment>
  );
};

export default ChangeMonth;
