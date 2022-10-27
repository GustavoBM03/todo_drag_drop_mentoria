import { Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { DoneSlice } from "../../redux/slice/DoneSlice";
import { ColumnLayout } from "../ColumnLayout";

export function Done() {
  //const { done } = useSelector((state: StoreState) => state);
  const { done } = useAppSelector((state) => state);
  const {
    actions: { add, remove, completeStatus, updateTextShowed },
  } = DoneSlice;

  return (
    <>
      <Typography mb={3}>Tarefas concluídas: {done.length}</Typography>
      <ColumnLayout
        droppableId="done"
        labelText="Adicionar Item"
        addHandler={add}
        removeHandler={remove}
        completedHandler={completeStatus}
        selectorState={done}
        updateTextShowed={updateTextShowed}
      ></ColumnLayout>
    </>
  );
}
