import React from "react";

const SelectDate = props => {
  return (
    <input
      type="month"
      value={props.date.toISOString().substr(0, 7)}
      onChange={props.onChangeDate}
    />
  );
};

export default SelectDate;
