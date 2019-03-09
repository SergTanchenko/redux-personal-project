import { types } from "./types";
import { tasks } from "./../../components/Scheduler/tasks";
import { fromJS } from "immutable";

const initialState = fromJS(tasks);

export const schedulerReducer = (state = initialState, action) => {
    switch (action) {
        case types.FILL_TASKS:
            return fromJS(action.payload);

        default:
            return state;
    }
};
