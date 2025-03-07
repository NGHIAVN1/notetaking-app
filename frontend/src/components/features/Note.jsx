import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import * as React from "react";

let addNotesBefore = {
  display: "flex",
  // textAlign: "revert",
  justifyContent: "center",
  placeholder: "Ghi chu ...",
  boxShadow: 1,
  alignItems: "center",
  width: "500px",
  borderRadius: "16px",
  borderColor: "aqua",
};
let addNotesAfter = {
  display: "block",
  // textAlign: "revert",
  justifyContent: "",
  placeholder: "Tieu de ...",
  boxShadow: 3,
  alignItems: "",
  width: "500px",
  height: "300px",
  borderRadius: "10px",
};
function selectIcon(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const moreMenuOpen = Boolean(moreMenuAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClick = (event) => {
    setMoreMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoreMenuClose = () => {
    setMoreMenuAnchorEl(null);
  };

  return (
    <Box
      sx={{
        flex: "inline-flex",
        height: "40px",
      }}
    >
      <IconButton onClick={typeof props === "function" ? props : props.onClick}>
        <CreateIcon />
      </IconButton>
      <IconButton onClick={typeof props === "function" ? props : props.onClick}>
        <ImageIcon />
      </IconButton>
      <IconButton onClick={handleMoreMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="more-menu"
        anchorEl={moreMenuAnchorEl}
        open={moreMenuOpen}
        onClose={handleMoreMenuClose}
        MenuListProps={{
          "aria-labelledby": "more-button",
        }}
      >
        <MenuItem onClick={handleMoreMenuClose}>Thêm nhãn</MenuItem>
        <MenuItem
          onClick={() => {
            if (props.toggleTodoList) {
              props.toggleTodoList();
            }
            handleMoreMenuClose();
          }}
        >
          {props.showTodoList ? "Hiển thị ghi chú" : "Hiển thị hộp kiểm"}
        </MenuItem>
      </Menu>
    </Box>
  );
}

const Note = () => {
  const [open, setOpen] = useState(false);
  const [showTodoList, setShowTodoList] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  function clickButtonOpen() {
    if (open == true) setOpen(true);
  }

  function clickButtonClose() {
    setOpen(false);
  }

  const toggleTodoList = () => {
    setShowTodoList(!showTodoList);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (e) => {
    if (e.key === "Enter" && newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  return (
    <div>
      <Card>
        <Box
          position={"-webkit-sticky"}
          sx={open ? addNotesBefore : addNotesAfter}
        >
          <Box flexGrow={1} paddingLeft={"20px"}>
            <FormControl>
              <Input
                fullWidth
                type="text"
                disableUnderline
                placeholder={
                  open ? addNotesBefore.placeholder : addNotesAfter.placeholder
                }
              ></Input>
            </FormControl>
          </Box>
          {open ? selectIcon(clickButton) : null}

          {open ? (
            ""
          ) : (
            <Box sx={{ margin: "20px" }}>
              {showTodoList ? (
                <Box>
                  <List dense>
                    {todos.map((todo) => (
                      <ListItem
                        key={todo.id}
                        dense
                        secondaryAction={
                          <IconButton
                            edge="end"
                            onClick={() => deleteTodo(todo.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        }
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={todo.completed}
                            onClick={() => toggleTodo(todo.id)}
                            icon={<CheckBoxOutlineBlankIcon />}
                            checkedIcon={<CheckBoxIcon />}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={todo.text}
                          sx={{
                            textDecoration: todo.completed
                              ? "line-through"
                              : "none",
                            color: todo.completed
                              ? "text.disabled"
                              : "text.primary",
                          }}
                        />
                      </ListItem>
                    ))}
                    <ListItem>
                      <ListItemIcon>
                        <CheckBoxOutlineBlankIcon color="disabled" />
                      </ListItemIcon>
                      <Input
                        placeholder="Thêm công việc mới..."
                        fullWidth
                        disableUnderline
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyDown={addTodo}
                      />
                    </ListItem>
                  </List>
                </Box>
              ) : (
                <TextField
                  id="filled-multiline-static"
                  type="text"
                  fullWidth
                  size="small"
                  multiline
                  rows={6}
                  placeholder={
                    open
                      ? addNotesAfter.placeholder
                      : addNotesBefore.placeholder
                  }
                ></TextField>
              )}
            </Box>
          )}
          {open ? (
            true
          ) : (
            <Box sx={{ display: "flex", margin: "20px" }}>
              <Box flexGrow={1}>
                {selectIcon({
                  onClick: clickButton,
                  toggleTodoList: toggleTodoList,
                  showTodoList: showTodoList,
                })}
              </Box>
              <Box>
                <Button onClick={clickButtonClose}>Đóng</Button>
              </Box>
            </Box>
          )}
        </Box>
      </Card>
    </div>
  );
};

export default Note;
