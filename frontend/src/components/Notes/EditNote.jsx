import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import systemNotes from "../../../api/notes";

const EditNote = ({ open, handleClose, note, onNoteUpdated }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset form when note changes
  React.useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      setError("");
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title && !content) {
      setError("Please enter a title or content");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const noteData = {
        _id: note._id,
        title,
        content,
      };

      await systemNotes.updateNote(noteData);
      onNoteUpdated();
      handleClose();
    } catch (err) {
      console.error("Error updating note:", err);
      setError("Failed to update note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Chỉnh sửa ghi chú</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            autoFocus
            margin="dense"
            label="Tiêu đề"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            margin="dense"
            label="Nội dung"
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Lưu"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditNote;
