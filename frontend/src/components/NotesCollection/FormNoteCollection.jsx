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
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import { v4 as uuid } from "uuid";

import ListForm from "./ListForm";
import checklistService from "../../../api/checklist";
import systemNotes from "../../../api/notes";
import collectionService from "../../../api/collection";

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
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FormNoteCollection = ({ dataNotes, setSavingData, savingData }) => {
  const [showTextField, setShowTextField] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showList, setList] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [loadingImage, setLoadingImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setImageFile(file); // Store the actual file object
      reader.onloadend = () => {
        setLoadingImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Don't submit if title and content are empty
    if (!title && !content && !showList && !imageFile) {
      setError("Please enter a title or content for your note");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (showList) {
        // Submit a checklist note
        const checklistData = {
          title: title || "Untitled Checklist",
          checklist_items: items,
        };

        const response = await checklistService.createChecklist(checklistData);
        console.log("Checklist created:", response);
        setSuccess(true);

        // Update parent component to refresh notes list
        setSavingData(!savingData);

        // Reset form
        setTitle("");
        setContent("");
        setShowTextField(false);
        setList(false);
        setItems([]);
        setImageFile(null);
        setLoadingImage("");
      } else {
        // For regular notes with image, handle file upload separately
        let imageUrl = null;

        if (imageFile) {
          setUploadingImage(true);

          // Create FormData to send the file
          const formData = new FormData();
          formData.append("image", imageFile);

          try {
            // Upload the image first
            const uploadResponse = await systemNotes.uploadImage(formData);
            console.log("Image upload response:", uploadResponse);

            if (uploadResponse && uploadResponse.imageUrl) {
              imageUrl = uploadResponse.imageUrl;
            }
          } catch (uploadError) {
            console.error("Error uploading image:", uploadError);
            setError("Failed to upload image. Please try again.");
            setLoading(false);
            setUploadingImage(false);
            return;
          } finally {
            setUploadingImage(false);
          }
        }

        // Now create the note with the image URL
        const noteData = {
          title: title || "Untitled Note",
          content,
          labels: localStorage.getItem("idCollection"),
        };

        // Only add imageUrl if we have one
        if (imageUrl) {
          noteData.imageUrl = imageUrl;
        }

        const response =
          await collectionService.createNotesCollection(noteData);
        console.log("Note created:", response);
        setSuccess(true);

        // Update parent component to refresh notes list
        setSavingData(!savingData);

        // Reset form
        setTitle("");
        setContent("");
        setShowTextField(false);
        setImageFile(null);
        setLoadingImage("");
      }
    } catch (err) {
      console.error("Error creating note:", err);
      setError("Failed to save note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveItems = (savedItems) => {
    setItems(savedItems);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (title || content || items.length > 0 || imageFile) {
          handleSubmit({ preventDefault: () => {} });
        } else {
          setShowTextField(false);
        }
      }}
    >
      <MuiContainer maxWidth="md">
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Container>
          {loadingImage.length > 0 && (
            <Box
              maxWidth={400}
              maxHeight={200}
              component="img"
              src={loadingImage}
              alt="Uploaded"
              sx={{
                width: "100%",
                objectFit: "contain",
                borderRadius: 1,
                mb: 2,
              }}
            />
          )}
          <TextField
            size="small"
            placeholder={showTextField ? "Tiêu đề" : "Ghi chú"}
            variant="standard"
            InputProps={{ disableUnderline: true }}
            onClick={() => setShowTextField(true)}
            style={{ marginBottom: 10 }}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            value={title}
          />

          {showTextField && (
            <Box>
              {!showList ? (
                <TextField
                  multiline
                  rows={4}
                  placeholder="Ghi chú ..."
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  onChange={(e) => setContent(e.target.value)}
                  name="content"
                  value={content}
                />
              ) : (
                <ListForm onSave={handleSaveItems} initialItems={items} />
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Box>
                  <IconButton>
                    <CreateIcon />
                  </IconButton>
                  <IconButton
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? (
                      <CircularProgress size={24} />
                    ) : (
                      <ImageIcon />
                    )}
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleImage}
                      accept="image/*"
                    />
                  </IconButton>
                  <IconButton onClick={() => setList(!showList)}>
                    <ChecklistIcon />
                  </IconButton>
                </Box>

                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={loading || uploadingImage}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </Box>
            </Box>
          )}
        </Container>

        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={() => setSuccess(false)}
          message="Note saved successfully"
        />
      </MuiContainer>
    </ClickAwayListener>
  );
};

export default FormNoteCollection;
