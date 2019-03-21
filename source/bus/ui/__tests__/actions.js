import { uiActions } from "../actions";

describe("ui actions: ", () => {
    test("startFetching", () => {
        expect(uiActions.startFetching()).toMatchInlineSnapshot(`
Object {
  "type": "START_FETCHING",
}
`);
    });

    test("stopFetching", () => {
        expect(uiActions.stopFetching()).toMatchInlineSnapshot(`
Object {
  "type": "STOP_FETCHING",
}
`);
    });

    test("startEditing", () => {
        expect(uiActions.startEditing(__.mockedTask.id, __.mockedTask.message))
            .toMatchInlineSnapshot(`
Object {
  "payload": Object {
    "id": "5c92a92c1ec3ce8659b3197e",
    "initialMessage": "sort tasks by date",
  },
  "type": "START_EDITING",
}
`);
    });

    test("updateEditedMessage", () => {
        expect(uiActions.updateEditedMessage(__.mockedUpdatedTask.message))
            .toMatchInlineSnapshot(`
Object {
  "payload": "UPDATED_TASK_MESSAGE",
  "type": "UPDATE_EDITING_MESSAGE",
}
`);
    });

    test("updateSearchQuery", () => {
        expect(uiActions.updateSearchQuery(__.mockedSearchQuery))
            .toMatchInlineSnapshot(`
Object {
  "payload": "NEW_SEARCH_QUERY",
  "type": "UPDATE_SEARCH_QUERY",
}
`);
    });

    test("stopEditing", () => {
        expect(uiActions.stopEditing()).toMatchInlineSnapshot(`
Object {
  "type": "STOP_EDITING",
}
`);
    });

    test("emitError with meta", () => {
        expect(uiActions.emitError(__.error, __.meta)).toMatchInlineSnapshot(`
Object {
  "error": true,
  "meta": Object {
    "prop1": "value1",
  },
  "payload": [Error: TEST_ERROR_MESSAGE],
  "type": "EMIT_ERROR",
}
`);
    });

    test("emitError without meta", () => {
        expect(uiActions.emitError(__.error)).toMatchInlineSnapshot(`
Object {
  "error": true,
  "meta": null,
  "payload": [Error: TEST_ERROR_MESSAGE],
  "type": "EMIT_ERROR",
}
`);
    });
});
