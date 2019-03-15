import { types } from "./types";

export const uiActions = {
    startFetching: () => {
        return {
            type: types.START_FETCHING,
        };
    },
    stopFetching: () => {
        return {
            type: types.STOP_FETCHING,
        };
    },
    startEditing: (id, initialMessage) => {
        return {
            type:    types.START_EDITING,
            payload: { id, initialMessage },
        };
    },
    updateEditedMessage: (updatedMessage) => {
        return {
            type:    types.UPDATE_EDITING_MESSAGE,
            payload: updatedMessage,
        };
    },
    stopEditing: () => {
        return {
            type: types.STOP_EDITING,
        };
    },
};
