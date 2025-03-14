import React, { useContext } from "react";
import { Box, Grid2 } from "@mui/material";
import Note from "../components/Notes/Note";
// import { DataContext } from "../context/DataProvider";
import Notes from "../components/Notes/Notes";
const HomePage = () => {
  return (
    <Box
      component={"main"}
      position={"sticky"}
      sx={{
        flexGrow: "1",
        width: "80%",
        float: "right",
        marginTop: "48px",
        justifyItems: "center",
      }}
    >
      {/* <HomPage /> */}
      <Note />
      <Grid2
        container
        spacing={{ xs: 1, sm: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
        sx={{ margin: "20px" }}
      >
        {Array.from({ length: 30 }, (_, index) => (
          <Grid2 size={{ sm: 4, xs: 4, md: 4, xl: 3 }} key={index}>
            <Notes> {index + 1}</Notes>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default HomePage;
