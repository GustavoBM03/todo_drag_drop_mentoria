import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const store = configureStore({ reducer: combineReducers({}) });

export type StoreDispatch = typeof store.dispatch;

export type StoreState = ReturnType<typeof store.getState>;
