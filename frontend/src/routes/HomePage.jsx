import React, { useContext, useEffect, useState } from "react";
import { Box, Grid2 } from "@mui/material";
import Note from "../components/Notes/Note";
// import { DataContext } from "../context/DataProvider";
import Notes from "../components/Notes/Notes";
import { isAuth } from "../util/auth";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [save, setSave] = useState(false);
  console.log(save);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth()) {
      navigate("/login");
    }
  }, []);
  return (
    <Box
      component={"main"}
      position={"sticky"}
      sx={{
        flexGrow: "1",
        width: "80%",
        float: "right",
        marginTop: "100px",
      }}
    >
      {/* <HomPage /> */}
      <Note setSave={setSave} save={save} />
      <Box sx={{ display: "flex", justifyItems: "left" }}>
        <Grid2
          container
          spacing={{ xs: 1, sm: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
          sx={{ margin: "10px" }}
        >
          <Notes save={save} />
        </Grid2>
      </Box>
    </Box>
  );
};

export default HomePage;
