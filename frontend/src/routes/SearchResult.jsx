import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Grid2,
  Divider,
  CircularProgress,
  Box,
  Alert,
  Paper,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import systemNotes from "../../api/notes";
import EditNote from "../components/Notes/EditNote";
import LiveChecklistView from "../components/Notes/LiveChecklistView";

export default function SearchResult({ note, save }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  console.log(note);
  //   const fetchNotes = async () => {
  //     console.log("Fetching notes...");
  //     setLoading(true);
  //     try {
  //       const res = await systemNotes.getNotes();
  //       console.log("Notes response:", res);

  //       setNotes(Array.isArray(res) ? res : []);
  //       setError(null);
  //     } catch (err) {
  //       console.error("Error fetching notes:", err);
  //       setError(`Failed to load notes: ${err.message || "Unknown error"}`);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchNotes();
  //   }, [save]);

  // Edit note handlers
  const handleEditClick = (note) => {
    setEditingNote(note);
    setIsEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setIsEditDialogOpen(false);
    setEditingNote(null);
  };

  const handleNoteUpdated = () => {
    fetchNotes();
    setNotification({
      open: true,
      message: "Cập nhật ghi chú thành công!",
      severity: "success",
    });
  };

  // Delete note handlers
  const handleDeleteClick = (noteId) => {
    setDeletingNoteId(noteId);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirmClose = () => {
    setDeleteConfirmOpen(false);
    setDeletingNoteId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingNoteId) return;

    try {
      await systemNotes.deleteNote(deletingNoteId);
      fetchNotes();
      setNotification({
        open: true,
        message: "Đã xóa ghi chú!",
        severity: "success",
      });
    } catch (err) {
      console.error("Error deleting note:", err);
      setNotification({
        open: true,
        message: "Không thể xóa ghi chú. Vui lòng thử lại.",
        severity: "error",
      });
    } finally {
      handleDeleteConfirmClose();
    }
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  // Render notes
  return (
    <>
      <Grid2 container spacing={3} sx={{ p: 2 }}>
        <Grid2 item xs={12} sm={6} md={4} lg={3} key={note._id}>
          <Card
            sx={{
              height: "100%",
              width: "240px",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 3,
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="div">
                {note.title}
              </Typography>

              {note.type === "checklist" ? (
                <LiveChecklistView
                  checklists={note.checklists}
                  onChecklistUpdated={handleChecklistUpdated}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {note.content}
                </Typography>
              )}
            </CardContent>

            <Divider />

            <CardActions>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => handleEditClick(note)}
              >
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteClick(note._id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid2>
      </Grid2>

      {/* Edit Dialog */}
      <EditNote
        open={isEditDialogOpen}
        handleClose={handleEditClose}
        note={editingNote}
        onNoteUpdated={handleNoteUpdated}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={handleDeleteConfirmClose}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa ghi chú này không? Hành động này không thể
            hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose}>Hủy</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleNotificationClose}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}
