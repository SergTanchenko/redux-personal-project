import { types } from "./types";
import { fromJS, List } from "immutable";

const initialState = List();

const taskIdEqualsTo = (taskId) => {
    return (task) => task.get("id") === taskId;
};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TASKS:
            return fromJS(action.payload);
        case types.CREATE_TASK:
            return state.push(fromJS(action.payload));
        case types.DELETE_TASK:
            return state.filter((task) => {
                task.get("id") !== action.payload;
            });
        case types.UPDATE_TASK:
            const { data, updatedProperty } = action.payload;
            const updatedTask = fromJS(data).first();

            return state.updateIn(
                [
                    state.findIndex(taskIdEqualsTo(updatedTask.get("id"))),
                    updatedProperty
                ],
                () => updatedTask.get(updatedProperty)
            );

        default:
            return state;
    }
};
