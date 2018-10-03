import React from "react";

export default class ShowTypeChecker extends React.Component {
  onChange = e => {
    this.props.onSelectNewViewType(e.target.value);
  };
  render() {
    const { defaultType } = this.props;
    return (
      <div className="field">
        <div className="control">
          <div className="select is-primary">
            <select value={defaultType} onChange={this.onChange}>
              <option value="month">Month</option>
              <option value="day">Day</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}
