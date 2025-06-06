import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material"; // Using Grid instead of Masonry

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
import EditNote from "./EditNote";
import LiveChecklistView from "./LiveChecklistView";
import collectionService from "../../../api/collection";
import systemNotes from "../../../api/notes"; // Added missing import

export default function NoteCollection({ save }) {
  const [notes, setNotes] = useState([]);
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

  const fetchNotes = async () => {
    console.log("Fetching notes...");
    setLoading(true);
    try {
      const res = await collectionService.getNotesCollection();
      console.log("Notes response:", res);

      setNotes(Array.isArray(res) ? res : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError(`Failed to load notes: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [save]);

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

  // Function to refresh notes after checklist item update
  const handleChecklistUpdated = () => {
    fetchNotes();
  };

  // Render loading state
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Render error state
  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  // Render empty state
  if (!notes || notes.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Paper elevation={1} sx={{ p: 3, textAlign: "center" }}>
          <NoteAddIcon
            sx={{ fontSize: 60, color: "primary.main", opacity: 0.7, mb: 2 }}
          />
          <Typography variant="h6" gutterBottom>
            Không có ghi chú nào
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Bạn chưa có ghi chú nào. Hãy tạo ghi chú đầu tiên bằng cách sử dụng
            biểu mẫu ở trên.
          </Typography>
        </Paper>
      </Box>
    );
  }

  // Render notes
  return (
    <>
      <Box sx={{ width: "100%", p: 2 }}>
        <Grid container spacing={2}>
          {notes
            .filter((f) => f.labels === localStorage.getItem("idCollection"))
            .map((note) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={note._id}>
                <Card
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    boxShadow:
                      "0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
                    transition: "box-shadow 0.2s ease-in-out",
                    border: "1px solid #e0e0e0",
                    overflow: "hidden",
                    height: "100%", // Make sure all cards in a row have same height
                    "&:hover": {
                      boxShadow:
                        "0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149)",
                    },
                  }}
                >
                  {note.image ? (
                    <CardMedia
                      component="img"
                      image={note.image}
                      sx={{
                        objectFit: "cover",
                        maxHeight: 194,
                        width: "100%",
                      }}
                    />
                  ) : null}
                  <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    {note.title && (
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{
                          fontWeight: 500,
                          mb: 1,
                        }}
                      >
                        {note.title}
                      </Typography>
                    )}

                    {note.type === "checklist" ? (
                      <LiveChecklistView
                        checklists={note.checklists}
                        noteId={note._id}
                        onChecklistUpdated={handleChecklistUpdated}
                      />
                    ) : (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {note.content}
                      </Typography>
                    )}
                  </CardContent>
                  <Box
                    display="flex"
                    minHeight={"25px"}
                    width={"100px"}
                    borderRadius={10}
                    paddingLeft={"10px"}
                    justifyContent={"center"}
                    textAlign={"center"}
                    sx={{
                      backgroundColor: "rgba(28, 197, 28, 0.2)",
                    }}
                  >
                    <span>{localStorage.getItem("nameCollection")}</span>
                  </Box>

                  <CardActions
                    sx={{
                      padding: "4px 8px",
                      display: "flex",
                      justifyContent: "flex-end",
                      opacity: 0.6,
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    <Button
                      size="small"
                      onClick={() => handleEditClick(note)}
                      sx={{ minWidth: "auto", p: "6px" }}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(note._id)}
                      sx={{ minWidth: "auto", p: "6px" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>

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
