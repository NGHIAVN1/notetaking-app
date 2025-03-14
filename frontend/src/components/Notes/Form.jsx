import React, { useState, useRef, useContext } from "react";
import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
import ChecklistIcon from "@mui/icons-material/Checklist";
import {
  Box,
  Container as MuiContainer,
  ClickAwayListener,
  TextField,
  IconButton,
  Button,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import { v4 as uuid } from "uuid";

import ListForm from "./ListForm";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  box-shadow:
    0 1px 2px 0 rgb(60 64 67 / 30%),
    0 2px 6px 2px rgb(60 64 67 / 15%);
  padding: 10px 15px;
  border-radius: 8px;
  border-color: "#e0e0e0";
  margin: auto;
  margin-bottom: 2rem;
  min-height: 30px;
  width: 400px;
`;

const note = {
  id: "",
  title: "",
  text: "",
};

const Form = () => {
  const [showTextField, setShowTextField] = useState(false);
  const [showList, setList] = useState(false);
  // const [addNote, setAddNote] = useState({ ...note, id: uuid() });

  // const { setNotes } = useContext(DataContext);

  // const containerRef = useRef();

  // const onTextChange = (e) => {
  //   let changedNote = { ...addNote, [e.target.name]: e.target.value };
  //   setAddNote(changedNote);
  // };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setShowTextField(false);
        // containerRef.current.style.minHeight = "30px";

        // setAddNote({ ...note, id: uuid() });
        // if (addNote.title || addNote.text) {
        //   setNotes((prevArr) => [addNote, ...prevArr]);
        // }
      }}
    >
      <MuiContainer maxWidth="md">
        <Container>
          {
            <TextField
              size="small"
              placeholder={showTextField ? "Tiêu đề" : "Ghi chú"}
              variant="standard"
              InputProps={{ disableUnderline: true }}
              onClick={() => {
                setShowTextField(true);
                // containerRef.current.style.minHeight = "70px";
              }}
              style={{ marginBottom: 10 }}
              onChange={(e) => onTextChange(e)}
              name="title"
              // value={addNote.title}
            />
          }
          {showTextField && (
            <Box>
              {!showList ? (
                <TextField
                  multiline
                  rows={4}
                  placeholder={showTextField ? "Ghi chú ..." : "Tiêu đề"}
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  onChange={(e) => onTextChange(e)}
                  name="text"
                  // value={addNote.text}
                />
              ) : (
                <ListForm />
              )}
              <Box
                sx={{ display: "flex", boxSizing: "border-box", flexGrow: 1 }}
              >
                <Box width={300}>
                  <IconButton>
                    <CreateIcon />
                  </IconButton>
                  <IconButton>
                    <ImageIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setList(!showList);
                    }}
                  >
                    <ChecklistIcon />
                  </IconButton>
                </Box>

                <Button>close</Button>
              </Box>
            </Box>
          )}
        </Container>
      </MuiContainer>
    </ClickAwayListener>
  );
};

export default Form;
