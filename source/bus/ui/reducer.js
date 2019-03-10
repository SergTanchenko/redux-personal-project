import { types } from "./types";
import { Map } from "immutable";

const initialState = Map({
    isFetching: false,
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_FETCHING:
            return state.set("isFetching", true);
        case types.STOP_FETCHING:
            return state.set("isFetching", false);
        default:
            return state;
    }
};
