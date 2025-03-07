import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import {
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { NavLink } from "react-router-dom";

export default function AccountUser() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement logout functionality here
    // Example: authService.logout();
    console.log("Logging out...");
    handleClose();
    // You might want to redirect or update auth context
  };

  return (
    <Stack direction="row" spacing={2}>
      <IconButton
        id="user-account"
        onClick={handleClick}
        aria-controls={open ? "user-account-more" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
      </IconButton>
      <Menu
        id="user-account-more"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "user-account",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuList>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <NavLink to={"profile"} end>
              <Typography>Tài khoản</Typography>
            </NavLink>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            <Typography color="error">
              <NavLink to={"/login"} end>
                <Typography>Đăng xuất</Typography>
              </NavLink>
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
}
