import { fromJS } from "immutable";

import { uiReducer } from "./../reducer";
import { uiActions } from "./../actions";

describe("test ui reducer: ", () => {
    test("should return initialState by default", () => {
        expect(uiReducer(void 0, {})).toMatchInlineSnapshot(`
Immutable.Map {
  "isFetching": false,
  "searchQuery": "",
  "editingTask": Immutable.Map {},
}
`);
    });

    test("should handle START_FETCHING action", () => {
        expect(uiReducer(void 0, uiActions.startFetching()))
            .toMatchInlineSnapshot(`
Immutable.Map {
  "isFetching": true,
  "searchQuery": "",
  "editingTask": Immutable.Map {},
}
`);
    });

    test("should handle STOP_FETCHING action", () => {
        expect(uiReducer(void 0, uiActions.stopFetching()))
            .toMatchInlineSnapshot(`
Immutable.Map {
  "isFetching": false,
  "searchQuery": "",
  "editingTask": Immutable.Map {},
}
`);
    });

    test("should handle START_EDITING action", () => {
        expect(
            uiReducer(
                void 0,
                uiActions.startEditing(__.mockedTask.id, __.mockedTask.message)
            )
        ).toMatchInlineSnapshot(`
Immutable.Map {
  "isFetching": false,
  "searchQuery": "",
  "editingTask": Immutable.Map {
    "id": "5c92a92c1ec3ce8659b3197e",
    "initialMessage": "sort tasks by date",
  },
}
`);
    });

    test("should handle STOP_EDITING action", () => {
        const state = fromJS({
            editingTask: {
                id:             "5c92a92c1ec3ce8659b3197e",
                initialMessage: "sort tasks by date",
            },
        });

        expect(uiReducer(state, uiActions.stopEditing()))
            .toMatchInlineSnapshot(`
Immutable.Map {
  "editingTask": Immutable.Map {},
}
`);
    });

    test("should handle UPDATE_SEARCH_QUERY action", () => {
        expect(
            uiReducer(void 0, uiActions.updateSearchQuery(__.mockedSearchQuery))
        ).toMatchInlineSnapshot(`
Immutable.Map {
  "isFetching": false,
  "searchQuery": "NEW_SEARCH_QUERY",
  "editingTask": Immutable.Map {},
}
`);
    });

    test("should handle UPDATE_EDITING_MESSAGE action", () => {
        const state = fromJS({
            editingTask: {
                id:             "5c92a92c1ec3ce8659b3197e",
                initialMessage: "sort tasks by date",
            },
        });
        const updatedMessage = "NEW_EDITED_MESSAGE";

        expect(
            uiReducer(state, uiActions.updateEditedMessage({ updatedMessage }))
        ).toMatchInlineSnapshot(`
Immutable.Map {
  "editingTask": Immutable.Map {
    "id": "5c92a92c1ec3ce8659b3197e",
    "initialMessage": "sort tasks by date",
    "updatedMessage": "NEW_EDITED_MESSAGE",
  },
}
`);
    });
});
