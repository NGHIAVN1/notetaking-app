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

  // Initialize local checklist state from props
  useEffect(() => {
    if (checklists && Array.isArray(checklists)) {
      setLocalChecklists([...checklists]);
    } else {
      setLocalChecklists([]);
    }
  }, [checklists]);

  // Toggle checkbox state with optimistic update
  const handleToggleCheck = async (item) => {
    if (readOnly) return;

    // Find the item in the local state
    const itemIndex = localChecklists.findIndex((i) => i._id === item._id);
    if (itemIndex === -1) return;

    // Create a new array with the updated item - crucial for React to detect state change
    const updatedChecklists = [...localChecklists];
    updatedChecklists[itemIndex] = {
      ...updatedChecklists[itemIndex],
      isChecked: !updatedChecklists[itemIndex].isChecked,
    };

    // Update UI immediately (optimistic update)
    setLocalChecklists(updatedChecklists);
    setUpdatingItemId(item._id);

    try {
      // Then make API call in background
      await checklistService.updateChecklistItem(item._id, {
        isChecked: !item.isChecked,
      });

      // No need to update UI again on success, it's already updated
    } catch (error) {
      console.error("Error updating checklist item:", error);

      // Only revert if the API call failed
      const revertedChecklists = [...localChecklists];
      revertedChecklists[itemIndex] = {
        ...revertedChecklists[itemIndex],
        isChecked: item.isChecked, // Revert to original state
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

    // Find the item in local state
    const itemIndex = localChecklists.findIndex(
      (item) => item._id === editingItem,
    );
    if (itemIndex === -1) return;

    // Store the original text in case we need to revert
    const originalText = localChecklists[itemIndex].content;

    // Optimistically update the UI
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

      // Revert on error
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

  // Handle error snackbar close
  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <>
      <List
        dense
        disablePadding
        sx={{
          bgcolor: "background.paper",
          pt: 0,
          maxHeight: "100px", // Limit the height
          overflowY: "auto", // Enable scrolling
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
              py: 0.25, // Reduced vertical padding
              minHeight: "32px", // Set a consistent minimum height
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
                  checked={item.isChecked}
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
                  textDecoration: item.isChecked ? "line-through" : "none",
                  color: item.isChecked ? "text.secondary" : "text.primary",
                  wordBreak: "break-word",
                  "& .MuiTypography-root": {
                    fontSize: "0.875rem", // Smaller font size
                    lineHeight: "1.2", // Tighter line height
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
                  disabled={!newItemText.trim()}
                  sx={{ padding: "3px" }}
                >
                  <CheckIcon fontSize="small" sx={{ fontSize: "16px" }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => {
                    setIsAddingItem(false);
                    setNewItemText("");
                  }}
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
    </>
  );
};

export default LiveChecklistView;
