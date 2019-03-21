import { createStore, combineReducers } from "redux";

import { formsReducer as forms } from "../../bus/forms/reducer";
import { tasksReducer as tasks } from "../../bus/tasks/reducer";
import { uiReducer as ui } from "../../bus/ui/reducer";

import { store } from "./../store";

const referenceReducer = combineReducers({
    forms,
    tasks,
    ui,
});

const referenceStore = createStore(referenceReducer);

describe("store: ", () => {
    test("should have valid state shape", () => {
        expect(store.getState()).toEqual(referenceStore.getState());
    });
});
