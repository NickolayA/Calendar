import React from "react";
import { connect } from "react-redux";
import { changeViewType } from "../actions/actions";
class ShowTypeChecker extends React.Component {
  render() {
    return (
      <div className="field">
        <div className="control">
          <div className="select is-primary">
            <select
              value={this.props.typeView}
              onChange={this.props.changeViewType}
            >
              <option value="without"> Without Events </option>
              <option value="with"> Show Events </option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    typeView: state.typeViewReducer.typeView
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeViewType: e => dispatch(changeViewType(e.target.value))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowTypeChecker);
