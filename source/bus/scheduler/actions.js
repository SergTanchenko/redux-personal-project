import { types } from "./types";

export const schedulerActions = {
    loadTasks: (tasks) => {
        return {
            type:    types.FILL_TASKS,
            payload: tasks,
        };
    },
};
