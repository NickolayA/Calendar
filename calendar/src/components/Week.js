import React from "react";
import DayCell from "./DayCell";

const Week = props => {
  return <tr className="week"> {props.children} </tr>;
};

export default Week;
