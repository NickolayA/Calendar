import { CHANGE_VIEW_TYPE } from "../actions/types";
const typeViewReducer = (
  state = {
    typeView: "without"
  },
  action
) => {
  switch (action.type) {
    case CHANGE_VIEW_TYPE:
      return {
        ...state,
        typeView: action.newType
      };
  }
  return state;
};

export default typeViewReducer;
