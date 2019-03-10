import { fromJs } from "immutable";

import { types } from "./types";
import { api } from "../../REST/api";

export const tasksActions = {
    // Sync
    fillTasks: (tasks) => {
        return {
            type:    types.FILL_TASKS,
            payload: tasks,
        };
    },
    createTask: (task) => {
        return {
            type:    types.CREATE_TASK,
            payload: task,
        };
    },

    // Async
    fillTasksAsync: () => async (dispatch) => {
        dispatch({
            type: types.FILL_TASKS_ASYNC,
        });

        const response = await api.tasks.fetch();
        const { data } = await response.json();

        dispatch(tasksActions.fillTasks(data));
    },
    createTaskAsync: (taskMessage) => async (dispatch) => {
        dispatch({
            type: types.CREATE_TASK_ASYNC,
        });
        const response = await api.tasks.create(taskMessage);
        const { data } = await response.json();

        dispatch(tasksActions.createTask(data));
    },
};
