import { Box } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

const SearchPage = () => {
  const data = useContext(DataContext);
  console.log(data);

  return (
    <Box
      position={"sticky"}
      sx={{
        flexGrow: "1",
        width: "80%",
        float: "right",
        marginTop: "48px",
        justifyItems: "center",
      }}
    >
      {/* <HomPage /> */}
      <h1>Search Page</h1>
    </Box>
  );
};

export default SearchPage;
