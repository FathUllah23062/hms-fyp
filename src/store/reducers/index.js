// Root Reducer
import { combineReducers } from "redux";
import { authReducer } from './authReducer';
import { mealReducer } from "./showMealReducer";
import { roomReducer } from "./showRoomReducer";
import { CoditionalDataReducer } from "./getConditionalDataReducer";
import { CoditionalIdReducer } from "./getConditionalIdReducer";
import { bookNowReducer } from "./showBookNowReducer";
import { getingIdReducer } from "./getIdOnRoomNoAndBedNoReducer";
import { expensesReducer } from "./showExpenesesReducer";
import { compantReducer } from "./complantReducer";




export let rootReducer = combineReducers({
  auth: authReducer,
  meal: mealReducer,
  room: roomReducer,
  conditionalData: CoditionalDataReducer,
  conditionalId: CoditionalIdReducer,
  bookNow: bookNowReducer,
  getingId: getingIdReducer,
  expenses: expensesReducer,
  complants: compantReducer,
});

export default rootReducer;
