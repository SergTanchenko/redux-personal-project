import { types } from "./types";
import { fromJS, List } from "immutable";

const initialState = List();

const taskIdEqualsTo = (taskId) => {};

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
            const { task: updatedTask } = action.payload;

            return state.update(
                state.findIndex((task) => task.get("id") === updatedTask.id),
                () => fromJS(updatedTask)
            );

        default:
            return state;
    }
};
