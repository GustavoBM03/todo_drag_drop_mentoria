import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Checkbox,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { StoreDispatch } from "../redux/store";
import { IColumnLayoutProps, ICustomKeyboardEvent } from "../types";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";

export function ColumnLayout({
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

  const handleOnKeyDown = ({ target, key }: ICustomKeyboardEvent) => {
    if (key === "Enter") {
      if (target.value.length > 0 && target.value.length <= 200) {
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

      <Box width="100%" display="flex" justifyContent="center">
        <Button
          size="medium"
          sx={{ my: 1, maxWidth: 200 }}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleOnClick}
          disabled={
            textDescription.length === 0 || textDescription.length > 200
          }
        >
          Adicionar Item
        </Button>

        <List sx={{ minHeight: 300 }}>
          {selectorState.map((item, index) => {
            return (
              <ListItem
                sx={{
                  position: "relative",
                  border: "1px solid #989898",
                  bgColor: "white",
                  my: 1,
                  borderRadius: "3px",
                  "& .MuiTypography-root": {
                    display: "flex",
                    alignItems: "center",
                  },
                }}
                key={item.id}
              >
                <ListItemText
                  sx={{
                    textDecoration: item.isFinished ? "line-through" : "none",
                    wordBreak: "break-word",
                  }}
                >
                  <IconButton sx={{ p: 1, mr: 1 }}>
                    <ArrowDownwardIcon />
                  </IconButton>

                  <Box
                    component="span"
                    width="100%"
                    position="absolute"
                    top="0"
                    fontSize=".7rem"
                  >
                    {item.updatedAt ? "Atualizado " : "Criado "} at:
                    {" " + item.updatedAt || item.createdAt}
                  </Box>

                  <Box component="span" width="100%">
                    {item.text}
                  </Box>

                  <Box display="flex" component="span">
                    <IconButton
                      onClick={() => dispatch(removeHandler(item.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Checkbox
                      edge="end"
                      value={item.isFinished}
                      checked={item.isFinished}
                      inputProps={{ "aria-label": "controlled" }}
                      onChange={() =>
                        dispatch(
                          completedHandler({
                            isFinished: !item.isFinished,
                            id: item.id,
                            updatedAt: new Date().toLocaleString(),
                          })
                        )
                      }
                    />
                  </Box>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
