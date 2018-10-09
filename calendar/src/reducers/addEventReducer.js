import {
  ENTER_EVENT_MESSAGE,
  CHANGE_DATE_EVENT_ADDITION,
  ENTER_EVENT_START_TIME,
  ENTER_EVENT_END_TIME,
  SELECT_USE_TIME,
  SELECT_ANNUAL_EVENT,
  INVERT_TIME_IS_VALID,
  INVERT_MESSAGE_IS_VALID,
  SET_MESSAGE_ADDITION_SUCCESS,
  RESET_MESSAGE_ADDITION_SUCCESS,
  TOGGLE_MODAL
} from "../actions/types";

const initialState = {
  eventMessage: "",
  eventDate: "", //new Date(props.year, props.month, props.dayInMonthNumber + 1)
  eventStart: "",
  eventEnd: "",
  useTime: false,
  annualEvent: false,
  validationTime: true,
  validationMessage: true,
  eventMessageAdditionSuccess: false
};

const addEventReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case SET_MESSAGE_ADDITION_SUCCESS:
      return {
        ...state,
        eventMessageAdditionSuccess: true
      };
    case RESET_MESSAGE_ADDITION_SUCCESS:
      return {
        ...state,
        eventMessageAdditionSuccess: false
      };
    case TOGGLE_MODAL:
      return initialState;
    case ENTER_EVENT_MESSAGE:
      return {
        ...state,
        eventMessage: action.newEventMessage
      };
    case CHANGE_DATE_EVENT_ADDITION:
      return {
        ...state,
        eventDate: action.newEventDate
      };
    case ENTER_EVENT_START_TIME:
      return {
        ...state,
        eventStart: action.newEventStartTime
      };
    case ENTER_EVENT_END_TIME:
      return {
        ...state,
        eventEnd: action.newEventEndTime
      };
    case SELECT_USE_TIME:
      return {
        ...state,
        useTime: action.newUseTime
      };
    case SELECT_ANNUAL_EVENT:
      return {
        ...state,
        annualEvent: action.newAnnualEvent
      };
    case INVERT_TIME_IS_VALID:
      return {
        ...state,
        validationTime: action.newValidationTime
      };
    case INVERT_MESSAGE_IS_VALID:
      return {
        ...state,
        validationMessage: action.newValidationMessage
      };
  }
  return state;
};

export default addEventReducer;
