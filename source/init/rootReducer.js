import { combineReducers } from "redux";

import { tasksReducer as tasks } from "../bus/tasks/reducer";

export const rootReducer = combineReducers({
    tasks,
});
