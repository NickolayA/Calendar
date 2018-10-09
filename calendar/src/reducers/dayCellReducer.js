import {
  TOGGLE_MODAL,
  TOGGLE_MODAL_BY_DAY,
  ADD_INITIAL_CELL_STATE
} from "../actions/types";

const initialState = {
  showModal: false,
  doNotToggle: false
};

const dayCellReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_INITIAL_CELL_STATE:
      return {
        ...state,
        [action.dayCellCode]: initialState
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        [action.dayCellCode]: {
          showModal: false,
          doNotToggle: false
        }
      };
    case TOGGLE_MODAL_BY_DAY:
      return {
        ...state,
        [action.dayCellCode]: {
          showModal: true,
          doNotToggle: true
        }
      };
  }
  return state;
};

export default dayCellReducer;