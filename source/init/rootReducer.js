import { combineReducers } from "redux";

import { formsReducer as forms } from "../bus/forms/reducer";
import { tasksReducer as tasks } from "../bus/tasks/reducer";
import { uiReducer as ui } from "../bus/ui/reducer";

export const rootReducer = combineReducers({
    forms,
    tasks,
    ui,
});
