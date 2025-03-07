import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";

const SearchLives = ({ users, setFilterSearch }) => {
  console.log(users);
  const [searchItem, setSearchItem] = useState("");
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
    <Box component="form" sx={{ flexGrow: 1 }}>
      <TextField
        size="small"
        placeholder="Search notes..."
        value={searchItem}
        onChange={handleSearch}
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
