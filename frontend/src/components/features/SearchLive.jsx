import { Box, ClickAwayListener } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";

const SearchLives = ({ users, setFilterSearch, filterSearch }) => {
  console.log(users);
  const [searchItem, setSearchItem] = useState("");
  let navigate = useNavigate();

  const [click, setClick] = useState(false);
  const handleSearch = (event) => {
    const searchTerms = event.target.value;
    setSearchItem(searchTerms);
    const newFilter = users.filter((user) => {
      return user.firstName.toLowerCase().includes(searchItem.toLowerCase());
    });

    // Implement search logic here
    setFilterSearch(newFilter);
  };

  return (
    <Box component="form" sx={{ flexGrow: 1, paddingLeft: "10%" }}>
      {}
      <TextField
        size="small"
        placeholder="Search notes..."
        value={searchItem}
        onChange={handleSearch}
        onClick={() => navigate("search")}
        sx={{
          bgcolor: "background.paper",
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
