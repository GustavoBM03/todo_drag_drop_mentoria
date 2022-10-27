import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Done } from "./components/columns/Done";
import { InProgress } from "./components/columns/InProgress";
import { ToDo } from "./components/columns/ToDo";

function App() {
  return (
    <Container>
      <Typography textAlign="center" variant="h3" mt={3} mb={5}>
        ToDo App
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item md={4}>
          <ToDo />
        </Grid>
        <Grid item md={4}>
          <InProgress />
        </Grid>
        <Grid item md={4}>
          <Done />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
