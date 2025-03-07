import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Notes({ children }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState({
    title: "Lizard",
    content:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    image: "/src/assets/contemplative-reptile.jpg",
    tags: ["animals", "reptiles"],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Here you would save the note to your backend
    console.log("Saving note:", note);
    handleClose();
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setNote({
        ...note,
        tags: [...note.tags, e.target.value],
      });
      e.target.value = "";
    }
  };

  const handleRemoveTag = (tagToDelete) => {
    setNote({
      ...note,
      tags: note.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  return (
    <>
      <Card
        sx={{
          minWidth: 238,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        <CardActionArea onClick={handleClickOpen}>
          {note.image && (
            <CardMedia
              component="img"
              height="140"
              image={note.image}
              alt={note.title}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" noWrap>
              {note.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {note.content}
            </Typography>

            {note.tags.length > 0 && (
              <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {note.tags.slice(0, 2).map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
                {note.tags.length > 2 && (
                  <Chip
                    label={`+${note.tags.length - 2}`}
                    size="small"
                    color="default"
                    variant="outlined"
                  />
                )}
              </Box>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton size="small" color="primary" onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      {/* Note Edit Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          elevation: 8,
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <TextField
            name="title"
            value={note.title}
            onChange={handleChange}
            variant="standard"
            fullWidth
            placeholder="Title"
            InputProps={{
              disableUnderline: true,
              style: { fontSize: "1.5rem", fontWeight: 500 },
            }}
          />
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {note.image && (
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={note.image}
                  alt={note.title}
                  sx={{ borderRadius: 1 }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "rgba(255, 255, 255, 0.7)",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                    },
                  }}
                  onClick={() => setNote({ ...note, image: null })}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}

            <TextField
              name="content"
              value={note.content}
              onChange={handleChange}
              multiline
              fullWidth
              rows={8}
              placeholder="Add note content..."
              variant="outlined"
            />

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Tags
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: "wrap", gap: 1 }}
              >
                {note.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    color="primary"
                  />
                ))}
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Add tag..."
                  onKeyDown={handleAddTag}
                  sx={{ maxWidth: "120px" }}
                />
              </Stack>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          <Button
            startIcon={<AddPhotoAlternateIcon />}
            onClick={() => console.log("Add image clicked")}
          >
            Add Image
          </Button>
          <Box>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" sx={{ ml: 1 }}>
              Save
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
