import * as React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import { List, ListItem, Stack } from "@mui/material";
const Header = ({ children, mode, onToggleSidebar, isSidebarOpen }) => {
  let theme = mode === "dark" ? "default" : "inherit";

  return (
    <Box position="block" sx={{ display: "flex", padding: "0" }}>
      <AppBar color={theme}>
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onToggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ mr: 2 }}
          >
            Notes
          </Typography>
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
