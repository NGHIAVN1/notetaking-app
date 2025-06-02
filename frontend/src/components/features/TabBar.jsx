import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import LabelIcon from "@mui/icons-material/Label";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import CreateTags from "./CreateTags.jsx";
import labelService from "../../../api/label.js";

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "blueviolet",
  width: "100%",
  "&:hover": {
    textDecoration: "none",
    color: "blueviolet",
  },
}));

const TabBar = ({ theme }) => {
  const [open, setOpen] = useState(false);
  const [labels, setLabels] = useState([]);
  const [refreshLabels, setRefreshLabels] = useState(0);

  useEffect(() => {
    labelService.getLabels().then((data) => {
      console.log(data);
      setLabels(data);
    });
  }, [refreshLabels]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (labelCreated = false) => {
    setOpen(false);
    if (labelCreated) {
      setRefreshLabels((prev) => prev + 1);
    }
  };
  return (
    <List
      sx={{
        width: "100%",
        height: "100vh",
        color: "blueviolet",
        bgcolor: "background.paper",
      }}
    >
      <ListItemButton>
        <ListItemIcon>
          <LightbulbIcon />
        </ListItemIcon>
        <NavLink to="/">
          <Typography>Ghi chú</Typography>
        </NavLink>
      </ListItemButton>
      <React.Fragment>
        <ListItemButton onClick={handleClickOpen}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <Typography>Choose Notes Kindle</Typography>
        </ListItemButton>
        <CreateTags close={(success) => handleClose(success)} props={open} />
      </React.Fragment>
      <React.Fragment>
        <ListItemButton onClick={handleClickOpen}>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <Typography>Tạo nhãn</Typography>
        </ListItemButton>
        <CreateTags close={(success) => handleClose(success)} props={open} />
      </React.Fragment>

      <div>
        {labels.map((label) => (
          <ListItemButton
            key={label._id || label.id}
            onClick={() => {
              localStorage.setItem("idCollection", label._id);
              localStorage.setItem("nameCollection", label.label_name);
            }}
          >
            <ListItemIcon>
              <LabelIcon sx={{ color: "#FFD700" }} />
            </ListItemIcon>
            <NavLink to={`/${label.label_name}`}>{label.label_name}</NavLink>
          </ListItemButton>
        ))}
      </div>

      <ListItemButton>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <NavLink to="/trash">
          <Typography>Thùng rác</Typography>
        </NavLink>
      </ListItemButton>
    </List>
  );
};
export default TabBar;
