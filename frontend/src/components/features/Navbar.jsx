import * as React from "react";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { List, ListItem, Stack } from "@mui/material";
const Header = ({ children, mode, onToggleSidebar, isSidebarOpen }) => {
  let theme = mode === "dark" ? "default" : "inherit";

  return (
    <Box position="block" sx={{ display: "flex", padding: "0" }}>
      <AppBar color={theme}>
        <Toolbar variant="dense">
          <Box
            sx={{
              margin: "2px",
              width: "50px",
              height: "50px",
            }}
          >
            <img alt="Logo" src={logo} width={40} height={40} />
          </Box>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

// Header.propTypes = {
//   children: PropTypes.node,
//   mode: PropTypes.string,
//   onToggleSidebar: PropTypes.func,
//   isSidebarOpen: PropTypes.bool
// };

export default Header;
