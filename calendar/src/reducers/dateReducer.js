import { CHANGE_DATE, MONTH_FORWARD, MONTH_BACKWARD } from "../actions/types";
import { addMonthToDate, subtractMonthFromDate } from "../helpers/datetime";

const dateReducer = (
  state = {
    currentDate: new Date(Date.now())
  },
  action
) => {
  switch (action.type) {
    case CHANGE_DATE:
      return {
        currentDate: action.currentDate
      };
    case MONTH_FORWARD:
      return {
        currentDate: addMonthToDate(state.currentDate)
      };
    case MONTH_BACKWARD:
      return {
        currentDate: subtractMonthFromDate(state.currentDate)
      };
    default:
      return state;
  }
};

export default dateReducer;
