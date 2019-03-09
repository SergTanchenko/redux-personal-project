import { combineReducers } from "redux";

import { schedulerReducer as tasks } from "../bus/scheduler/reducer";

export const rootReducer = combineReducers({
    tasks,
});
