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

const CreateTags = ({ close, props }) => {
  console.log(props);
  return (
    <div>
      <Dialog
        open={props}
        onClose={close}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              close;
            },
          },
        }}
      >
        <DialogTitle>Tạo nhãn</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="tags"
            name="email"
            label="Tạo nhãn"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Thôi</Button>
          <Button type="submit">Xong</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateTags;
