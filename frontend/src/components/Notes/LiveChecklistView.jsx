import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  CircularProgress,
  Collapse,
  Box,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import checklistService from "../../../api/checklist";

const LiveChecklistView = ({
  checklists,
  noteId, // Add noteId prop to identify which note these checklist items belong to
  readOnly = false,
  onChecklistUpdated,
}) => {
  const [localChecklists, setLocalChecklists] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editText, setEditText] = useState("");
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [newItemText, setNewItemText] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Initialize local checklist state from props
  useEffect(() => {
    if (checklists && Array.isArray(checklists)) {
      console.log("Received checklists:", checklists);
      setLocalChecklists([...checklists]);
    } else {
      setLocalChecklists([]);
    }
  }, [checklists]);

  // Toggle checkbox state with optimistic update
  const handleToggleCheck = async (item) => {
    if (readOnly) return;

    const itemIndex = localChecklists.findIndex((i) => i._id === item._id);
    if (itemIndex === -1) return;

    const updatedChecklists = [...localChecklists];
    updatedChecklists[itemIndex] = {
      ...updatedChecklists[itemIndex],
      is_checked: !updatedChecklists[itemIndex].is_checked,
    };

    setLocalChecklists(updatedChecklists);
    setUpdatingItemId(item._id);

    try {
      await checklistService.updateChecklistItem(item._id, {
        is_checked: !item.is_checked,
      });
    } catch (error) {
      console.error("Error updating checklist item:", error);

      const revertedChecklists = [...localChecklists];
      revertedChecklists[itemIndex] = {
        ...revertedChecklists[itemIndex],
        is_checked: item.is_checked,
      };

      setLocalChecklists(revertedChecklists);
      setErrorMessage("Failed to update checklist. Please try again.");
      setShowError(true);
    } finally {
      setUpdatingItemId(null);
    }
  };

  // Start editing an item
  const handleStartEdit = (item) => {
    setEditingItem(item._id);
    setEditText(item.content);
  };

  // Save edited item with optimistic update
  const handleSaveEdit = async () => {
    if (!editingItem) return;

    const itemIndex = localChecklists.findIndex(
      (item) => item._id === editingItem,
    );
    if (itemIndex === -1) return;

    const originalText = localChecklists[itemIndex].content;

    const updatedChecklists = [...localChecklists];
    updatedChecklists[itemIndex] = {
      ...updatedChecklists[itemIndex],
      content: editText,
    };
    setLocalChecklists(updatedChecklists);

    try {
      setUpdatingItemId(editingItem);
      await checklistService.updateChecklistItem(editingItem, {
        content: editText,
      });

      if (onChecklistUpdated) {
        onChecklistUpdated();
      }
    } catch (error) {
      console.error("Error updating checklist item text:", error);

      const revertedChecklists = [...localChecklists];
      revertedChecklists[itemIndex] = {
        ...revertedChecklists[itemIndex],
        content: originalText,
      };
      setLocalChecklists(revertedChecklists);

      setErrorMessage("Failed to update checklist. Please try again.");
      setShowError(true);
    } finally {
      setUpdatingItemId(null);
      setEditingItem(null);
      setEditText("");
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditText("");
  };

  // Handle keypresses while editing
  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  // Add new checklist item
  const handleAddNewItem = async () => {
    if (!newItemText.trim()) return;

    setUpdatingItemId("new");

    try {
      const tempItem = {
        _id: `temp-${Date.now()}`,
        content: newItemText,
        is_checked: false,
      };

      setLocalChecklists([...localChecklists, tempItem]);

      console.log("Adding new checklist item to note:", noteId);

      const response = await checklistService.createChecklistItem({
        content: newItemText,
        is_checked: false,
        note_id: noteId,
      });

      console.log("New item created:", response);

      if (response && response.item) {
        const finalChecklists = localChecklists.map((item) =>
          item._id === tempItem._id ? response.item : item,
        );
        setLocalChecklists([...finalChecklists, response.item]);
      }

      setSuccessMessage("Item added successfully");
      setShowSuccess(true);

      setNewItemText("");
      setIsAddingItem(false);

      if (onChecklistUpdated) {
        onChecklistUpdated();
      }
    } catch (error) {
      console.error("Error adding new checklist item:", error);
      setErrorMessage("Failed to add new item. Please try again.");
      setShowError(true);

      setLocalChecklists(
        localChecklists.filter((item) => item._id !== `temp-${Date.now()}`),
      );
    } finally {
      setUpdatingItemId(null);
    }
  };

  // Handle keypresses while adding new item
  const handleNewItemKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddNewItem();
    } else if (e.key === "Escape") {
      setIsAddingItem(false);
      setNewItemText("");
    }
  };

  // Handle error snackbar close
  const handleCloseError = () => {
    setShowError(false);
  };

  // Handle success snackbar close
  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <List
        dense
        disablePadding
        sx={{
          bgcolor: "background.paper",
          pt: 0,
          maxHeight: "100px",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.1)",
            borderRadius: "10px",
          },
        }}
      >
        {localChecklists.map((item) => (
          <ListItem
            key={item._id}
            dense
            sx={{
              borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
              py: 0.25,
              minHeight: "32px",
            }}
            secondaryAction={
              !readOnly &&
              editingItem !== item._id && (
                <Tooltip title="Edit item">
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => handleStartEdit(item)}
                    sx={{
                      opacity: 0.5,
                      "&:hover": { opacity: 1 },
                      padding: "2px",
                    }}
                  >
                    <EditIcon fontSize="small" sx={{ fontSize: "16px" }} />
                  </IconButton>
                </Tooltip>
              )
            }
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              {updatingItemId === item._id ? (
                <CircularProgress size={16} />
              ) : (
                <Checkbox
                  edge="start"
                  checked={item.is_checked}
                  disableRipple
                  disabled={readOnly}
                  onChange={() => handleToggleCheck(item)}
                  sx={{
                    padding: 0.25,
                    "& .MuiSvgIcon-root": { fontSize: 18 },
                  }}
                />
              )}
            </ListItemIcon>

            {editingItem === item._id ? (
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <TextField
                  fullWidth
                  variant="standard"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleEditKeyPress}
                  autoFocus
                  size="small"
                  sx={{ mr: 1 }}
                  InputProps={{ style: { fontSize: "0.875rem" } }}
                />
                <IconButton
                  size="small"
                  color="primary"
                  onClick={handleSaveEdit}
                  disabled={updatingItemId === item._id}
                  sx={{ padding: "3px" }}
                >
                  <CheckIcon fontSize="small" sx={{ fontSize: "16px" }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleCancelEdit}
                  disabled={updatingItemId === item._id}
                  sx={{ padding: "3px" }}
                >
                  <CloseIcon fontSize="small" sx={{ fontSize: "16px" }} />
                </IconButton>
              </Box>
            ) : (
              <ListItemText
                primary={item.content}
                sx={{
                  margin: 0,
                  textDecoration: item.is_checked ? "line-through" : "none",
                  color: item.is_checked ? "text.secondary" : "text.primary",
                  wordBreak: "break-word",
                  "& .MuiTypography-root": {
                    fontSize: "0.875rem",
                    lineHeight: "1.2",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  },
                }}
              />
            )}
          </ListItem>
        ))}

        {!readOnly && (
          <ListItem sx={{ py: 0.5, justifyContent: "center" }}>
            <Tooltip title="Add new item">
              <IconButton
                color="primary"
                size="small"
                onClick={() => setIsAddingItem(true)}
                sx={{
                  display: isAddingItem ? "none" : "inline-flex",
                  padding: "3px",
                }}
              >
                <AddIcon sx={{ fontSize: "18px" }} />
              </IconButton>
            </Tooltip>

            <Collapse in={isAddingItem} sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  mt: 0.5,
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Add new item..."
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyDown={handleNewItemKeyPress}
                  size="small"
                  autoFocus
                  sx={{
                    mr: 1,
                    "& .MuiOutlinedInput-input": {
                      padding: "6px 10px",
                      fontSize: "0.875rem",
                    },
                  }}
                />
                <IconButton
                  size="small"
                  color="primary"
                  onClick={handleAddNewItem}
                  disabled={!newItemText.trim() || updatingItemId === "new"}
                  sx={{ padding: "3px" }}
                >
                  {updatingItemId === "new" ? (
                    <CircularProgress size={16} />
                  ) : (
                    <CheckIcon fontSize="small" sx={{ fontSize: "16px" }} />
                  )}
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => {
                    setIsAddingItem(false);
                    setNewItemText("");
                  }}
                  disabled={updatingItemId === "new"}
                  sx={{ padding: "3px" }}
                >
                  <CloseIcon fontSize="small" sx={{ fontSize: "16px" }} />
                </IconButton>
              </Box>
            </Collapse>
          </ListItem>
        )}
      </List>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LiveChecklistView;
