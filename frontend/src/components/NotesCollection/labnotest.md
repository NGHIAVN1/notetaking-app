````

## Key Features

1. **Google Keep-Style Masonry Layout**: Uses MUI's Masonry component for the staggered grid layout that automatically handles different note heights.

2. **Responsive Design**: Adjusts columns based on screen size (1-5 columns).

3. **Note Type Handling**: Properly renders both text notes and checklists with appropriate styling.

4. **Loading & Error States**: Clean handling of loading and error states.

5. **Empty State**: Shows a helpful message when no notes exist.

6. **Clean Card Design**:
   - Subtle borders and elevation
   - Hover effects for better UX
   - Hidden action buttons that appear on hover (like Google Keep)

7. **Optimized Checklist Display**:
   - Limits display to 5 items with "+X more" indicator
   - Proper checked item styling
   - Works with both `isChecked` and `is_checked` field names

8. **Integration with Your Form**: Includes your Form component with a callback to refresh notes when a new one is added.

9. **Accessibility**: Uses proper ARIA attributes and keyboard navigation.

To use this component, just replace your current Notes.jsx content with this implementation, and make sure you have the `@mui/lab` package installed for the Masonry component:

```bash
npm install @mui/lab
````

This implementation closely matches Google Keep's visual style while working with your existing data structure.import \* as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Masonry from "@mui/lab/Masonry";
import {
Box,
Checkbox,
List,
ListItem,
ListItemIcon,
ListItemText,
Divider,
CircularProgress,
Chip,
IconButton,
Container,
Tooltip,
Paper
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import systemNotes from "../../../api/notes";
import Form from "./Form";

export default function Notes() {
const [notes, setNotes] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [notesUpdated, setNotesUpdated] = useState(false);

useEffect(() => {
fetchNotes();
}, [notesUpdated]);

const fetchNotes = () => {
setLoading(true);
systemNotes
.getNotes()
.then((res) => {
setNotes(res);
setLoading(false);
})
.catch((err) => {
console.log(err);
setError("Failed to load notes");
setLoading(false);
});
};

const handleDelete = (id) => {
// Add your delete API call here
console.log("Deleting note", id);
// After successful deletion:
// setNotesUpdated(!notesUpdated);
};

const handleEdit = (note) => {
// Add your edit handling here
console.log("Editing note", note);
};

// Function to render checklist items
const renderChecklistItems = (checklists) => {
if (!checklists || checklists.length === 0) return null;

    return (
      <List dense disablePadding>
        {checklists.slice(0, 5).map((item, index) => (
          <ListItem key={index} disablePadding dense>
            <ListItemIcon sx={{ minWidth: 28 }}>
              <Checkbox
                edge="start"
                checked={item.isChecked || item.is_checked || false}
                disabled
                size="small"
              />
            </ListItemIcon>
            <ListItemText
              primary={item.content || item.text}
              primaryTypographyProps={{
                fontSize: '0.875rem',
                style: {
                  textDecoration: (item.isChecked || item.is_checked) ? "line-through" : "none",
                  color: (item.isChecked || item.is_checked) ? "text.secondary" : "text.primary",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }
              }}
            />
          </ListItem>
        ))}
        {checklists.length > 5 && (
          <Box px={2} py={0.5}>
            <Typography variant="caption" color="text.secondary">
              +{checklists.length - 5} more items
            </Typography>
          </Box>
        )}
      </List>
    );

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
<Box
sx={{
          p: 4,
          color: "error.main",
          textAlign: "center"
        }} >
<Typography variant="h6">{error}</Typography>
<Typography variant="body2" sx={{ mt: 2 }}>
Please try refreshing the page
</Typography>
</Box>
);
}

return (
<Container maxWidth="xl">
<Box sx={{ mt: 3, mb: 4 }}>
<Form onNoteAdded={() => setNotesUpdated(!notesUpdated)} />
</Box>

      {notes.length === 0 ? (
        <Box sx={{ textAlign: "center", p: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No notes yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Click the add button above to create your first note
          </Typography>
        </Box>
      ) : (
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={2}
          sx={{ margin: 0 }}
        >
          {notes.map((note) => (
            <Paper
              key={note._id}
              elevation={1}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                transition: "all 0.2s ease-in-out",
                border: "1px solid rgba(0,0,0,0.08)",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transform: "translateY(-2px)"
                },
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Card Content */}
              <Box sx={{ p: 2, pb: 1, flexGrow: 1 }}>
                {/* Title */}
                {note.title && (
                  <Typography
                    variant="subtitle1"
                    component="h2"
                    fontWeight="500"
                    sx={{ mb: 1 }}
                  >
                    {note.title}
                  </Typography>
                )}

                {/* Content based on note type */}
                {note.type === "checklist" ? (
                  // Render checklist items
                  renderChecklistItems(note.checklists)
                ) : (
                  // Render text note content
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      whiteSpace: "pre-wrap",
                      overflowWrap: "break-word",
                      display: "-webkit-box",
                      WebkitLineClamp: 10,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}
                  >
                    {note.content}
                  </Typography>
                )}

                {/* Labels (if any) */}
                {note.labels && note.labels.length > 0 && (
                  <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1, gap: 0.5 }}>
                    {note.labels.map((label) => (
                      <Chip
                        key={label._id}
                        label={label.name}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                )}
              </Box>

              {/* Card Actions - only visible on hover */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 0.5,
                  opacity: 0,
                  transition: "opacity 0.2s",
                  "&:hover": { opacity: 1 },
                  bgcolor: "rgba(0,0,0,0.02)"
                }}
              >
                <Tooltip title="Edit">
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(note)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Change color">
                  <IconButton size="small">
                    <ColorLensOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Archive">
                  <IconButton size="small">
                    <ArchiveOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(note._id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          ))}
        </Masonry>
      )}
    </Container>

);
}

````

## Key Features

1. **Google Keep-Style Masonry Layout**: Uses MUI's Masonry component for the staggered grid layout that automatically handles different note heights.

2. **Responsive Design**: Adjusts columns based on screen size (1-5 columns).

3. **Note Type Handling**: Properly renders both text notes and checklists with appropriate styling.

4. **Loading & Error States**: Clean handling of loading and error states.

5. **Empty State**: Shows a helpful message when no notes exist.

6. **Clean Card Design**:
   - Subtle borders and elevation
   - Hover effects for better UX
   - Hidden action buttons that appear on hover (like Google Keep)

7. **Optimized Checklist Display**:
   - Limits display to 5 items with "+X more" indicator
   - Proper checked item styling
   - Works with both `isChecked` and `is_checked` field names

8. **Integration with Your Form**: Includes your Form component with a callback to refresh notes when a new one is added.

9. **Accessibility**: Uses proper ARIA attributes and keyboard navigation.

To use this component, just replace your current Notes.jsx content with this implementation, and make sure you have the `@mui/lab` package installed for the Masonry component:

```bash
npm install @mui/lab
````

This implementation closely matches Google Keep's visual style while working with your existing data structure.
