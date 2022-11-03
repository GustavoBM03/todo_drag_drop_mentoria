import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Done } from "./components/columns/Done";
import { InProgress } from "./components/columns/InProgress";
import { ToDo } from "./components/columns/ToDo";
import { useDispatch } from "react-redux";
import { StoreDispatch } from "./redux/store";
import { useAppSelector } from "./redux/hooks";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ToDoSlice as todo } from "./redux/slice/ToDoSlice";
import { InProgressSlice as inProgress } from "./redux/slice/InProgressSlice";
import { DoneSlice as done } from "./redux/slice/DoneSlice";
import { IModel } from "./types";

type TAllSlice = "todo" | "inProgress" | "done";

function App() {
  const dispatch = useDispatch<StoreDispatch>();
  const appState = useAppSelector((state) => state);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { destination, source, draggableId } = result;
    const allSlices = { todo, inProgress, done };

    if (destination.droppableId === source.droppableId) {
      dispatch(allSlices[destination.droppableId as TAllSlice].actions.reorder);
    } else {
      const [filterState] = (
        (appState as any)[source.droppableId] as IModel[]
      ).filter(({ id }) => id === draggableId);

      dispatch(
        allSlices[source.droppableId as TAllSlice].actions.remove(draggableId)
      );
      dispatch(
        allSlices[destination.droppableId as TAllSlice].actions.update({
          ...result,
          filterState,
        })
      );
    }
  };

  return (
    <Container>
      <Typography textAlign="center" variant="h3" mt={3} mb={5}>
        ToDo App
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <Grid item md={4}>
            <ToDo />
          </Grid>
          <Grid item md={4}>
            <InProgress />
          </Grid>
          <Grid item md={4}>
            <Done />
          </Grid>
        </DragDropContext>
      </Grid>
    </Container>
  );
}

export default App;
