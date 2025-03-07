import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import HomeIcon from "@mui/icons-material/Home";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import CreateTags from "./createTags";

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
  width: "100%",
}));

const NavBox = styled(Box)(({ theme, isopen }) => ({}));

const TabBar = ({ theme, isOpen }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <NavBox isopen={isOpen ? 1 : 0}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItemButton>
          <ListItemIcon>
            <LightbulbIcon />
          </ListItemIcon>
          <NavLink to="/">Ghi chú</NavLink>
        </ListItemButton>

        <React.Fragment>
          <ListItemButton onClick={handleClickOpen}>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <Typography>Tạo nhãn</Typography>
          </ListItemButton>
          <CreateTags close={handleClose} props={open} />
        </React.Fragment>

        <ListItemButton>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <NavLink to="/trash">Thùng rác</NavLink>
        </ListItemButton>
      </List>
    </NavBox>
  );
};

TabBar.propTypes = {
  theme: PropTypes.object,
  isOpen: PropTypes.bool,
};

export default memo(TabBar);
