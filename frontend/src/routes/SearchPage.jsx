import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useContext } from "react";
import DataContext from "../context/DataProvider";
import { Grid2 } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LiveChecklistView from "../components/Notes/LiveChecklistView";
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
        <Grid2
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            margin: "10px",
          }}
        >
          <Grid2 container spacing={2}>
            {" "}
            {dataSearch.term.trim().length > 0 ? (
              dataSearch.apiNotes && dataSearch.apiNotes.length > 0 ? (
                dataSearch.apiNotes
                  .filter((d) =>
                    d.title
                      ? d.title
                          .toLowerCase()
                          .includes(dataSearch.term.toLowerCase())
                      : false,
                  )
                  .map((note) => {
                    return (
                      <Box
                        sx={{ borderColor: "#e0e0e0", backgroundColor: "#fff" }}
                      >
                        <Grid2
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          key={note._id}
                          sx={{
                            margin: "10px",
                          }}
                        >
                          <Card
                            sx={{
                              width: "240px",
                              height: "100%",
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
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                              >
                                {note.title}
                              </Typography>

                              {note.type === "checklist" ? (
                                <LiveChecklistView
                                  checklists={note.checklists}
                                  onChecklistUpdated={handleChecklistUpdated}
                                />
                              ) : (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
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
                                <span>
                                  {localStorage.getItem("nameCollection")}
                                </span>
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
                          </Card>{" "}
                        </Grid2>
                      </Box>
                    );
                  })
              ) : (
                <p>No matching notes found</p>
              )
            ) : (
              <p>No results found</p>
            )}
          </Grid2>
        </Grid2>
      </Box>
      {/* <Notes save={dataSearch.term} /> */}
    </Box>
  );
};

export default SearchPage;
