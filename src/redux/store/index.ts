import { InProgressSlice } from "./../slice/InProgressSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { DoneSlice } from "../slice/DoneSlice";
import { ToDoSlice } from "../slice/ToDoSlice";

export const store = configureStore({
  reducer: combineReducers({
    done: DoneSlice.reducer,
    inProgress: InProgressSlice.reducer,
    todo: ToDoSlice.reducer,
  }),
});

export type StoreDispatch = typeof store.dispatch;

export type StoreState = ReturnType<typeof store.getState>;
