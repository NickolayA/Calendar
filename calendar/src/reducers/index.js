import { combineReducers } from "redux";
import eventsReducer from "./eventsReducer";
import dateReducer from "./dateReducer";
import addEventReducer from "./addEventReducer";
import dayCellReducer from "./dayCellReducer";

const rootReducer = combineReducers({
  events: eventsReducer,
  date: dateReducer,
  addEventReducer,
  dayCellReducer
});

export default rootReducer;
