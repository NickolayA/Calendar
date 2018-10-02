import React from "react";
import DayCell from "./DayCell";

const Week = props => {
  return <div className="week"> {props.children} </div>;
};

export default Week;
