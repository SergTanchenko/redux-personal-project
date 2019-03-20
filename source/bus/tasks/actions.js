import { actions } from "react-redux-form";
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
    deleteTask: (id) => {
        return {
            type:    types.DELETE_TASK,
            payload: id,
        };
    },
    updateTask: (updatedTask) => {
        return {
            type:    types.UPDATE_TASK,
            payload: updatedTask,
        };
    },
    markAllTasksAsDone: (updatedTasks) => {
        return {
            type:    types.MARK_ALL_TASKS_AS_DONE,
            payload: updatedTasks,
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
            dispatch(uiActions.emitError(error, "fillTasksAsync"));
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
            dispatch(actions.reset("forms.addTask"));
        } catch (error) {
            dispatch(uiActions.emitError(error, "createTaskAsync"));
        } finally {
            dispatch(uiActions.stopFetching());
        }
    },
    deleteTaskAsync: (taskId) => async (dispatch) => {
        try {
            dispatch(uiActions.startFetching());
            dispatch({
                type: types.DELETE_TASK_ASYNC,
            });
            const response = await api.tasks.delete(taskId);

            if (response.status !== 204) {
                const { message } = await response.json();

                throw new Error(message);
            }

            dispatch(tasksActions.deleteTask(taskId));
        } catch (error) {
            dispatch(uiActions.emitError(error, "deleteTaskAsync"));
        } finally {
            dispatch(uiActions.stopFetching());
        }
    },
    updateTaskAsync: ({ updatedTask }) => async (dispatch) => {
        try {
            dispatch(uiActions.startFetching());
            dispatch({
                type: types.UPDATE_TASK_ASYNC,
            });

            const response = await api.tasks.update(updatedTask);
            const {
                data: [task],
                message,
            } = await response.json();

            if (response.status !== 200) {
                throw new Error(message);
            }

            dispatch(tasksActions.updateTask({ task }));
        } catch (error) {
            dispatch(uiActions.emitError(error, "updateTaskAsync"));
        } finally {
            dispatch(uiActions.stopFetching());
        }
    },
    markAllTasksAsDoneAsync: () => async (dispatch, getState) => {
        try {
            dispatch(uiActions.startFetching());
            dispatch({
                type: types.MARK_ALL_TASKS_AS_DONE_ASYNC,
            });

            const doneTasks = getState().tasks.map((task) =>
                task.set("completed", true)
            );

            const response = await api.tasks.updateBulk(doneTasks);
            const { message } = await response.json();

            if (response.status !== 200) {
                throw new Error(message);
            }

            //Probably we should pass data to the reducer and update state using returned values by the server
            dispatch(tasksActions.markAllTasksAsDone());
        } catch (error) {
            dispatch(uiActions.emitError(error, "markAllTasksAsDoneAsync"));
        } finally {
            dispatch(uiActions.stopFetching());
        }
    },
};
