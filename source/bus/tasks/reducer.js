import { types } from "./types";
import { fromJS, List } from "immutable";

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TASKS:
            return fromJS(action.payload);
        case types.CREATE_TASK:
            return state.push(fromJS(action.payload));
        case types.DELETE_TASK:
            return state.filter((task) => task.get("id") !== action.payload);
        case types.UPDATE_TASK:
            return state.update(
                state.findIndex(
                    (task) => task.get("id") === action.payload.task.id
                ),
                () => fromJS(action.payload.task)
            );
        case types.MARK_ALL_TASKS_AS_DONE:
            // it is cheapest than taking returned array by the server and updating value one by one
            // using map in map
            // TODO: ask if there is a cheap way to update
            return state.map((task) => task.set("completed", true));

        default:
            return state;
    }
};
