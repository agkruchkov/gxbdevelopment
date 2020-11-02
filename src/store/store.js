import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import funcReducer from "./func";
import parametersReducer from "./parameters";

const configureAppStore = () =>
  configureStore({
    reducer: combineReducers({
      func: funcReducer,
      parameters: parametersReducer,
    }),
  });

export default configureAppStore;
