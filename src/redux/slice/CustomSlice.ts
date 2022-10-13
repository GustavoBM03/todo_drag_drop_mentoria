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
    },
  });
}
