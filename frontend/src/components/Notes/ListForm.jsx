import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  Box,
  Paper,
  TextField,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  InputAdornment,
} from "@mui/material";

const ListForm = ({ onSave, initialItems = [] }) => {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, { text: newItem, checked: false }]);
      setNewItem("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newItem.trim()) {
      handleAddItem();
      e.preventDefault();
    }
  };

  const handleToggleItem = (index) => {
    const updatedItems = [...items];
    updatedItems[index].checked = !updatedItems[index].checked;
    setItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleUpdateItemText = (index, newText) => {
    const updatedItems = [...items];
    updatedItems[index].text = newText;
    setItems(updatedItems);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        maxWidth: 400,
        margin: "0 auto",
        mt: 2,
      }}
    >
      <List>
        {items.map((item, index) => (
          <ListItem key={index} dense divider>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <DragIndicatorIcon fontSize="small" color="action" />
            </ListItemIcon>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Checkbox
                edge="start"
                checked={item.checked}
                onChange={() => handleToggleItem(index)}
                sx={{ p: 0.5 }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <TextField
                  fullWidth
                  value={item.text}
                  onChange={(e) => handleUpdateItemText(index, e.target.value)}
                  variant="standard"
                  sx={{
                    textDecoration: item.checked ? "line-through" : "none",
                    color: item.checked ? "text.disabled" : "text.primary",
                  }}
                  InputProps={{ disableUnderline: true }}
                />
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                size="small"
                onClick={() => handleDeleteItem(index)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", mt: 1 }}>
        <TextField
          fullWidth
          placeholder="Add item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AddIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Paper>
  );
};

export default ListForm;
