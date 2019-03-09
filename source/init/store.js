import { createStore } from "redux";

import { enhancers } from "./middleware/core";

import { rootReducer } from "./rootReducer";

export const store = createStore(rootReducer, enhancers);
