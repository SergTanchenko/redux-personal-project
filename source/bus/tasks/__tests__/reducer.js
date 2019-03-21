import { tasksReducer } from "./../reducer";
import { tasksActions } from "./../actions";

import { fromJS } from "immutable";

describe("test tasks reducer: ", () => {
    test("should return initialState by default", () => {
        expect(tasksReducer(void 0, {})).toMatchInlineSnapshot(
            `Immutable.List []`
        );
    });

    test("should handle FILL_TASKS action", () => {
        expect(tasksReducer(void 0, tasksActions.fillTasks([__.mockedTask])))
            .toMatchInlineSnapshot(`
Immutable.List [
  Immutable.Map {
    "id": "5c92a92c1ec3ce8659b3197e",
    "message": "sort tasks by date",
    "completed": false,
    "favorite": false,
    "created": "2019-03-20T20:57:16.767Z",
  },
]
`);
    });

    test("should handle CREATE_TASK action", () => {
        expect(tasksReducer(void 0, tasksActions.createTask(__.mockedTask)))
            .toMatchInlineSnapshot(`
Immutable.List [
  Immutable.Map {
    "id": "5c92a92c1ec3ce8659b3197e",
    "message": "sort tasks by date",
    "completed": false,
    "favorite": false,
    "created": "2019-03-20T20:57:16.767Z",
  },
]
`);
    });

    test("should handle DELETE_TASK action", () => {
        const state = fromJS([__.mockedTask]);

        expect(
            tasksReducer(state, tasksActions.deleteTask(__.mockedTask.id))
        ).toMatchInlineSnapshot(`Immutable.List []`);
    });

    test("should handle UPDATE_TASK action", () => {
        const state = fromJS([__.mockedTask]);
        const task = __.mockedUpdatedTask;

        expect(tasksReducer(state, tasksActions.updateTask({ task })))
            .toMatchInlineSnapshot(`
Immutable.List [
  Immutable.Map {
    "id": "5c92a92c1ec3ce8659b3197e",
    "message": "UPDATED_TASK_MESSAGE",
    "completed": true,
    "favorite": true,
    "created": "2019-03-20T20:57:16.767Z",
  },
]
`);
    });

    test("should handle MARK_ALL_TASKS_AS_DONE action", () => {
        const state = fromJS([__.mockedTask]);

        expect(tasksReducer(state, tasksActions.markAllTasksAsDone()))
            .toMatchInlineSnapshot(`
Immutable.List [
  Immutable.Map {
    "id": "5c92a92c1ec3ce8659b3197e",
    "message": "sort tasks by date",
    "completed": true,
    "favorite": false,
    "created": "2019-03-20T20:57:16.767Z",
  },
]
`);
    });
});
