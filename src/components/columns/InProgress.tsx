import { Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { InProgressSlice } from "../../redux/slice/InProgressSlice";
import { ColumnLayout } from "../ColumnLayout";

export function InProgress() {
  //const { done } = useSelector((state: StoreState) => state);
  const { inProgress } = useAppSelector((state) => state);
  const {
    actions: { add, remove, completeStatus, updateTextShowed },
  } = InProgressSlice;

  return (
    <>
      <Typography mb={3}>Tarefas em andamento: {inProgress.length}</Typography>
      <ColumnLayout
        droppableId="inProgress"
        labelText="Adicionar Item"
        addHandler={add}
        removeHandler={remove}
        completedHandler={completeStatus}
        selectorState={inProgress}
        updateTextShowed={updateTextShowed}
      ></ColumnLayout>
    </>
  );
}
