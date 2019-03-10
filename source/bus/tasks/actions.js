import { types } from "./types";

export const tasksActions = {
    loadTasks: (tasks) => {
        return {
            type:    types.FILL_TASKS,
            payload: tasks,
        };
    },
};
