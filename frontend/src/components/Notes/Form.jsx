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
  background-color: white;
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

const Form = ({ setSavingData, savingData }) => {
  const [showTextField, setShowTextField] = useState(false);
  const [state, setState] = useState({
    title: "",
    content: "",
    image: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const [showList, setList] = useState(false);
  const [imageFile, setImageFile] = useState({});
  const [loadingImage, setLoadingImage] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(imageFile);
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setState({ ...state, image: file }); //
      reader.onloadend = () => {
        setLoadingImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (showList) {
        // Submit a checklist note
        const checklistData = {
          title: state.title || "Untitled Checklist",
          checklist_items: items,
        };

        const response = await checklistService.createChecklist(checklistData);
        console.log("Checklist created:", response);
        setSuccess(true);

        // Update parent component to refresh notes list
        setSavingData(!savingData);

        // Reset form
        setState({
          title: "",
          content: "",
          image: "",
        });
        setShowTextField(false);
        setList(false);
        setItems([]);
        setLoadingImage("");
      } else {
        // For regular notes with image, handle file upload separately

        // Now create the note with the image URL
        const { title, content, image } = state;
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("content", content);

        const response = await systemNotes.addNote(formData);
        console.log("Note created:", response);
        setSuccess(true);

        // Update parent component to refresh notes list
        setSavingData(!savingData);

        // Reset form
        setState({
          title: "",
          content: "",
          image: "",
        });
        setShowTextField(false);
        setImageFile({});
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
        if (state.title || state.content || items.length > 0 || state.image) {
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
            fullWidth
            onChange={inputHandle}
            name="title"
            value={state.title}
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
                  fullWidth
                  onChange={inputHandle}
                  name="content"
                  value={state.content}
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
                    sx={{
                      enctype: "multipart/form-data",
                    }}
                  >
                    <ImageIcon />

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

export default Form;
