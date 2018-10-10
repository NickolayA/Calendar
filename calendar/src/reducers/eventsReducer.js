import { ADD_EVENT, CHANGE_ADD_INTERSECTED_EVENT } from "../actions/types";

import { addNewEventToCalendarState } from "../helpers/state";

const eventsReducer = (
  state = {
    addIntersectedEvent: false,
    eventIntersectionDetected: false
  },
  action
) => {
  switch (action.type) {
    case CHANGE_ADD_INTERSECTED_EVENT:
      return {
        ...state,
        addIntersectedEvent: action.payload
      };
    case ADD_EVENT:
      const newEvents = addNewEventToCalendarState(
        state,
        action.year,
        action.month,
        action.dayInMonthNumber,
        action.eventMessage,
        action.useTime,
        action.eventStartTime,
        action.eventEndTime,
        action.annualEvent,
        state.addIntersectedEvent
      );
      return newEvents;
    default:
      return state;
  }
};

export default eventsReducer;
