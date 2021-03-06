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
    updateSearchQuery: (searchQuery) => {
        return {
            type:    types.UPDATE_SEARCH_QUERY,
            payload: searchQuery,
        };
    },
    stopEditing: () => {
        return {
            type: types.STOP_EDITING,
        };
    },
    emitError: (error, meta = null) => {
        return {
            type:    types.EMIT_ERROR,
            payload: error,
            error:   true,
            meta,
        };
    },
};
