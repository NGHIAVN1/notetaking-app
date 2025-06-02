import React, { useContext, useEffect, useState } from "react";
import { Box, Grid2 } from "@mui/material";
// import { DataContext } from "../context/DataProvider";
import Notes from "../components/Notes/Notes";
import { isAuth } from "../util/auth";
import { useNavigate } from "react-router-dom";
import Note from "./Notes/Note";
import DataContext from "../context/DataProvider";
import NoteCollection from "./NotesCollection/NoteColletion";
import AddNotesCollection from "./NotesCollection/AddNoteCollection";

const NotesCollection = () => {
  const [save, setSave] = useState(false);
  console.log(save);
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);
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
      <AddNotesCollection
        dataNotes={dataContext.loadingCollection}
        setSave={setSave}
        save={save}
      />
      <Box sx={{ display: "flex", justifyItems: "left" }}>
        <NoteCollection save={save} />
      </Box>
    </Box>
  );
};

export default NotesCollection;
