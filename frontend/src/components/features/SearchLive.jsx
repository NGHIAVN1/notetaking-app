import { Box, ClickAwayListener } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";

const SearchLives = ({ term, setTerm, apiNotes }) => {
  let navigate = useNavigate();
  const handleSearch = (event) => {
    const inputSearch = event.target.value.toLowerCase();
    setTerm(inputSearch);
  };

  return (
    <Box component="form" sx={{ flexGrow: 1, paddingLeft: "10%" }}>
      {}
      <TextField
        size="small"
        value={term}
        placeholder="Search notes..."
        onChange={handleSearch}
        onClick={() => navigate("search")}
        sx={{
          bgcolor: "background.paper",
          backgroundColor: "rgba(0, 0, 0, .2)",
          borderRadius: 1,
          width: "400px",
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};
export default SearchLives;
