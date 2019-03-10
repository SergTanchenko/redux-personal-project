import { types } from "./types";
import { tasks } from "./../../components/Tasks/tasks";
import { fromJS } from "immutable";

const initialState = fromJS(tasks);

export const tasksReducer = (state = initialState, action) => {
    switch (action) {
        case types.FILL_TASKS:
            return fromJS(action.payload);

        default:
            return state;
    }
};
