// dateReducerTypes
import { CHANGE_DATE, MONTH_FORWARD, MONTH_BACKWARD } from "./types";
// addEventReducer types
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
  INVERT_ADD_INTERSECTED_EVENT
} from "../actions/types";

import {
  TOGGLE_MODAL,
  TOGGLE_MODAL_BY_DAY,
  ADD_INITIAL_CELL_STATE
} from "../actions/types";

import { ADD_EVENT } from "../actions/types";

// eventReducer
export const addEvent = (
  year,
  month,
  dayInMonthNumber,
  eventMessage,
  useTime,
  eventStartTime,
  eventEndTime,
  annualEvent
) => ({
  type: ADD_EVENT,
  year,
  month,
  dayInMonthNumber,
  eventMessage,
  useTime,
  eventStartTime,
  eventEndTime,
  annualEvent
});

// dateReducer
export const monthForward = currentDate => ({
  type: MONTH_FORWARD,
  currentDate
});

export const monthBackward = currentDate => ({
  type: MONTH_BACKWARD,
  currentDate
});

export const changeDate = currentDate => ({
  type: CHANGE_DATE,
  currentDate
});

// addEventReducer

export const changeEventMessage = newEventMessage => ({
  type: ENTER_EVENT_MESSAGE,
  newEventMessage
});

export const changeEventDate = newEventDate => ({
  type: CHANGE_DATE_EVENT_ADDITION,
  newEventDate
});

export const changeEventStartTime = newEventStartTime => ({
  type: ENTER_EVENT_START_TIME,
  newEventStartTime
});

export const changeEventEndTime = newEventEndTime => ({
  type: ENTER_EVENT_END_TIME,
  newEventEndTime
});

export const changeUseTime = newUseTime => ({
  type: SELECT_USE_TIME,
  newUseTime
});

export const changeAnnualEvent = newAnnualEvent => ({
  type: SELECT_ANNUAL_EVENT,
  newAnnualEvent
});

export const changeValidationTime = newValidationTime => ({
  type: INVERT_TIME_IS_VALID,
  newValidationTime
});

export const changeValidationMessage = newValidationMessage => ({
  type: INVERT_MESSAGE_IS_VALID,
  newValidationMessage
});

// eventMessage: "",
//       date: new Date(props.year, props.month, props.dayInMonthNumber + 1),
//       eventStart: "",
//       eventEnd: "",
//       useTime: false,
//       annualEvent: false,
//       validationTime: true,
//       validationMessage: true,
//       eventMessageAdditionSuccess: false,
//       addIntersectedEvent: false

// dayCellReducer

export const toggleModal = dayCellCode => ({
  type: TOGGLE_MODAL,
  dayCellCode
});

export const addInitialStateCell = dayCellCode => ({
  type: ADD_INITIAL_CELL_STATE,
  dayCellCode
});
