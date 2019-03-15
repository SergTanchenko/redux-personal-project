import { types } from "./types";
import { Map, fromJS } from "immutable";

const initialState = Map({
    isFetching:  false,
    editingTask: Map(),
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_FETCHING:
            return state.set("isFetching", true);
        case types.STOP_FETCHING:
            return state.set("isFetching", false);
        case types.START_EDITING:
            return state.set("editingTask", fromJS(action.payload));
        case types.STOP_EDITING:
            return state.set("editingTask", initialState.get("editingTask"));
        case types.UPDATE_EDITING_MESSAGE:
            const { updatedMessage } = action.payload;

            return state.mergeIn(["editingTask"], {
                updatedMessage,
            });
        default:
            return state;
    }
};
