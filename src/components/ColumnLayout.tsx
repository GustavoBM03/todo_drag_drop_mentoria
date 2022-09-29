import { Alert, Box, Collapse, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { StoreDispatch } from "../redux/store";
import { IColumnLayoutProps } from "../types";

function ColumnLayout({
  labelText,
  addHandler,
  removeHandler,
  completedHandler,
  selectorState,
}: IColumnLayoutProps) {
  const [textDescription, setTextDescription] = useState("");
  const [isError, setIsError] = useState({ isShow: false, text: "" });
  const dispatch = useDispatch<StoreDispatch>();

  const handleOnChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setTextDescription(value);
    setIsError({
      isShow: value.length > 200,
      text:
        value.length > 200
          ? "Tamanho limite de 200 caracteres ultrapassado!"
          : "",
    });
  };

  const handleOnBlur = () => {
    setIsError({ ...isError, isShow: false });
  };

  const handleOnKeyDown = ({ target, key }: KeyboardEvent) => {
    if (key === "Enter") {
      if (
        (target as HTMLInputElement).value.length > 0 &&
        (target as HTMLInputElement).value.length <= 200
      ) {
        handleOnClick();
      } else {
        setIsError({
          isShow: true,
          text: "Valor não pode ser vazio!",
        });
      }
    }
  };

  const handleOnClick = () => {
    if (!isError.isShow) {
      dispatch(addHandler(textDescription));
      setTextDescription("");
    }
  };

  return (
    <Box borderRadius={1} width="100%" sx={{ boxShadow: 2, p: 3 }}>
      <TextField
        fullWidth
        label={labelText}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeyDown}
        value={textDescription}
        variant="outlined"
        size="small"
      />

      <Collapse in={isError.isShow}>
        <Alert severity="error" sx={{ my: 1 }}>
          {isError.text}
        </Alert>
      </Collapse>
    </Box>
  );
}
