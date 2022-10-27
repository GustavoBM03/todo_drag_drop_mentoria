import { TActionSlice, TUpdateTextShowed } from "./../../types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModel } from "../../types";
import { v4 as uuid } from "uuid";

const initialState: IModel[] = [];

export function CreateCustomSlice(name: string) {
  const {
    actions: { add, remove, completeStatus, reorder, update, updateTextShowed },
    reducer,
  } = createSlice({
    name,
    initialState,
    reducers: {
      add: {
        reducer: (state, action: PayloadAction<IModel>) => {
          state.push(action.payload);
        },
        prepare: (text: string) => ({
          payload: {
            id: uuid(),
            text,
            isFinished: false,
            createdAt: new Date().toLocaleString(),
            isTextShowed: false,
          } as IModel,
        }),
      },
      remove: (state, action: PayloadAction<string>) => {
        const index = state.findIndex((x) => x.id === action.payload);
        state.splice(index, 1);
      },
      completeStatus: (state, action: PayloadAction<TActionSlice>) => {
        const index = state.findIndex((x) => x.id === action.payload.id);
        state[index].isFinished = action.payload.isFinished;
        state[index].updatedAt = action.payload.updatedAt;
      },
      reorder: (state, action) => {
        const [removed] = state.splice(action.payload.source.index, 1);
        state.splice(action.payload.destination.index, 0, removed);
      },
      update: (state, action) => {
        state.splice(
          action.payload.destination.index,
          0,
          action.payload.filterState
        );
      },
      updateTextShowed: (state, action: PayloadAction<TUpdateTextShowed>) => {
        const index = state.findIndex((x) => x.id === action.payload.id);
        state[index].isTextShowed = action.payload.isTextShowed;
      },
    },
  });

  return {
    actions: { add, remove, completeStatus, reorder, update, updateTextShowed },
    reducer,
  };
}
