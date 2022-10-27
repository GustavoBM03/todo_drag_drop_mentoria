import { Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { ToDoSlice } from "../../redux/slice/ToDoSlice";
import { ColumnLayout } from "../ColumnLayout";

export function ToDo() {
  //const { done } = useSelector((state: StoreState) => state);
  const { todo } = useAppSelector((state) => state);
  const {
    actions: { add, remove, completeStatus, updateTextShowed },
  } = ToDoSlice;

  return (
    <>
      <Typography mb={3}>Tarefas para fazer: {todo.length}</Typography>
      <ColumnLayout
        droppableId="todo"
        labelText="Adicionar Item"
        addHandler={add}
        removeHandler={remove}
        completedHandler={completeStatus}
        selectorState={todo}
        updateTextShowed={updateTextShowed}
      ></ColumnLayout>
    </>
  );
}
