import { types } from "./types";
import { api } from "../../REST/api";
import { uiActions } from "../../bus/ui/actions";

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
        try {
            dispatch(uiActions.startFetching());
            dispatch({
                type: types.FILL_TASKS_ASYNC,
            });

            const response = await api.tasks.fetch();
            const { data, message } = await response.json();

            if (response.status !== 200) {
                throw new Error(message);
            }

            dispatch(tasksActions.fillTasks(data));
        } catch (error) {
            //TODO: create uiAction for it and remove console.log
            console.log(error);
        } finally {
            dispatch(uiActions.stopFetching());
        }
    },
    createTaskAsync: (taskMessage) => async (dispatch) => {
        try {
            dispatch(uiActions.startFetching());
            dispatch({
                type: types.CREATE_TASK_ASYNC,
            });
            const response = await api.tasks.create(taskMessage);
            const { data, message } = await response.json();

            if (response.status !== 200) {
                throw new Error(message);
            }

            dispatch(tasksActions.createTask(data));
        } catch (error) {
            //TODO: create uiAction for it and remove console.log
            console.log(error);
        } finally {
            dispatch(uiActions.stopFetching());
        }
    },
};
