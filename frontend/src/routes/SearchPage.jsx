import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useContext } from "react";
import DataContext from "../context/DataProvider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LiveChecklistView from "../components/Notes/LiveChecklistView";
import { Grid } from "@mui/material"; // Using standard Grid instead of Masonry
import SearchResult from "./SearchResult";
// import { handleEditClick, handleDeleteClick } from "../components/Notes/Note";

const SearchPage = () => {
  const dataSearch = useContext(DataContext);
  console.log(dataSearch.apiNotes);

  const handleChecklistUpdated = (updatedChecklist) => {
    // TODO: Implement checklist update logic
    console.log("Checklist updated:", updatedChecklist);
  };

  const handleEditClick = (note) => {
    // TODO: Implement edit logic
    console.log("Edit clicked for note:", note);
  };

  const handleDeleteClick = (noteId) => {
    // TODO: Implement delete logic
    console.log("Delete clicked for note ID:", noteId);
  };

  useEffect(() => {
    dataSearch.apiNotes?.map((d) => console.log(d.content));
  }, [dataSearch.term]);

  // Filter notes based on search term
  const filteredNotes =
    dataSearch.term?.trim().length > 0 && dataSearch.apiNotes?.length > 0
      ? dataSearch.apiNotes.filter(
          (note) =>
            note?.title
              ?.toLowerCase()
              .includes(dataSearch.term.toLowerCase()) ||
            note?.content
              ?.toLowerCase()
              .includes(dataSearch.term.toLowerCase()),
        )
      : [];

  return (
    <Box
      position={"sticky"}
      sx={{
        flexGrow: "1",
        width: "80%",
        float: "right",
        marginTop: "48px",
      }}
    >
      <Box sx={{ display: "flex", justifyItems: "left" }}>
        <Grid
          container
          spacing={2}
          sx={{
            margin: "10px",
          }}
        >
          {dataSearch.term.trim().length > 0 ? (
            filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={note._id}>
                  <Box sx={{ borderColor: "#e0e0e0", backgroundColor: "#fff" }}>
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
                        breakInside: "avoid",
                        "&:hover": {
                          boxShadow:
                            "0 1px 3px 0 rgba(60,64,67,0.302), 0 4px 8px 3px rgba(60,64,67,0.149)",
                        },
                      }}
                    >
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
                      {note.labels && (
                        <Box
                          display="flex"
                          minHeight={"25px"}
                          width={"100px"}
                          borderRadius={10}
                          marginLeft={"10px"}
                          justifyContent={"center"}
                          textAlign={"center"}
                          sx={{
                            backgroundColor: "rgba(73, 205, 55, 0.2)",
                          }}
                        >
                          <span>{localStorage.getItem("nameCollection")}</span>
                        </Box>
                      )}
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
                  </Box>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography>No matching notes found</Typography>
              </Grid>
            )
          ) : (
            <Grid item xs={12}>
              <Typography>No search term entered</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      {/* <Notes save={dataSearch.term} /> */}
    </Box>
  );
};

export default SearchPage;
