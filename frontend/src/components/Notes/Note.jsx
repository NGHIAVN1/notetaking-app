import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  Input,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
import { useState } from "react";
import * as React from "react";
import Form from "./Form";

let addNotesBefore = {
  display: "flex",
  // textAlign: "revert",
  justifyContent: "center",
  placeholder: "Ghi chu ...",
  boxShadow: 1,
  alignItems: "center",

  width: "500px",
  borderColor: "aqua",
};
let addNotesAfter = {
  display: "block",
  // textAlign: "revert",
  justifyContent: "",
  placeholder: "Tieu de ...",
  boxShadow: 3,
  alignItems: "",
  backgroundColor: "white",

  width: "500px",
  height: "300px",
};
function selectIcon() {
  return (
    <Box
      sx={{
        flex: "inline-flex",
        height: "40px",
      }}
    >
      <IconButton>
        <CreateIcon />
      </IconButton>
      <IconButton>
        <ImageIcon />
      </IconButton>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
      {/* <Menu>
          <MenuItem>Thêm nhãn</MenuItem>
          <MenuItem></MenuItem>
        </Menu> */}
    </Box>
  );
}

const Note = ({ save, setSave }) => {
  const [open, setOpen] = useState(true);
  console.log(open);
  function addNotesForm() {
    setOpen(true);
  }
  function addNotesFormDetail() {
    console.log(open);
    setOpen(false);
  }
  return (
    <div>
      <Box>
        <Form setSavingData={setSave} savingData={save} />
      </Box>
    </div>
  );
};

export default Note;
