import { combineReducers } from "redux";
import { selfInfoReducer } from "./selfInfoReducer";
import { temporaryDataReducer } from "./temporaryDataReducer";

export const rootReducer = combineReducers({
  auth: selfInfoReducer,
  tempData: temporaryDataReducer,
});
