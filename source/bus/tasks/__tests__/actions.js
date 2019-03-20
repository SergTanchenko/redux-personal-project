import { types } from "./../types";
import { types as uiTypes } from "./../../ui/types";
import { tasksActions } from "../actions";

describe("sync tasks actions: ", () => {
    test("fillTasks", () => {
        expect(tasksActions.fillTasks()).toEqual({
            type: types.FILL_TASKS,
        });
    });
    test("createTask", () => {
        expect(tasksActions.createTask()).toEqual({
            type: types.CREATE_TASK,
        });
    });
    test("deleteTask", () => {
        expect(tasksActions.deleteTask()).toEqual({
            type: types.DELETE_TASK,
        });
    });
    test("updateTask", () => {
        expect(tasksActions.updateTask()).toEqual({
            type: types.UPDATE_TASK,
        });
    });
    test("markAllTasksAsDone", () => {
        expect(tasksActions.markAllTasksAsDone()).toEqual({
            type: types.MARK_ALL_TASKS_AS_DONE,
        });
    });
});

describe("async tasks actions: ", () => {
    describe("fillTasksAsync", () => {
        test("fetches all tasks", async () => {
            global.fetch = jest
                .fn()
                .mockImplementation(() =>
                    Promise.resolve(__.fetchResponseSuccess)
                );
            const dispatch = jest.fn();

            await tasksActions.fillTasksAsync()(dispatch);

            expect(dispatch).toBeCalledWith({
                type: uiTypes.START_FETCHING,
            });
            expect(dispatch).toBeCalledWith({
                type: types.FILL_TASKS_ASYNC,
            });

            expect(dispatch).toBeCalledWith({
                type:    types.FILL_TASKS,
                payload: [__.mockedTask],
            });

            expect(dispatch).toBeCalledWith({
                type: uiTypes.STOP_FETCHING,
            });
        });
    });
});
