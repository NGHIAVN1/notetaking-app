import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import labelService from "../../../api/label";
import { useState } from "react";
const CreateTags = ({ close, props }) => {
  const [label, setLabel] = useState();
  const handleSubmit = (e) => {
    labelService
      .createLabel(label)
      .then((res) => {
        console.log(res.data);
        alert("Tạo nhãn thành công");
        setLabel("");
        return res.data;
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  };
  return (
    <div>
      <Dialog open={props} onClose={close}>
        <DialogTitle>Tạo nhãn</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Tên nhãn"
            required
            onChange={(e) => setLabel(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Thôi</Button>
          <Button onClick={handleSubmit}>Xong</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateTags;
