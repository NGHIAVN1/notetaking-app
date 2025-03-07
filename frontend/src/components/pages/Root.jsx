import { ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TabBar from "../features/TabBar.jsx";
import Box from "@mui/material/Box";
import Header from "../features/Navbar.jsx";
import { useState, useEffect } from "react";
import { lightMode, darkMode } from "../features/DarkMode.jsx";
import { CssBaseline, Grid2, IconButton } from "@mui/material";
import SearchLive from "../features/SearchLive.jsx";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccountUser from "../../common/AcountUser.jsx";
import HomPage from "./Root.jsx";
import Notes from "./notes.jsx";
import Note from "../features/Note.jsx";
// example data structure
const users = [
  { firstName: "John", id: 1 },
  { firstName: "Emily", id: 2 },
  { firstName: "Michael", id: 3 },
  { firstName: "Sarah", id: 4 },
  { firstName: "David", id: 5 },
  { firstName: "Jessica", id: 6 },
  { firstName: "Daniel", id: 7 },
  { firstName: "Olivia", id: 8 },
  { firstName: "Matthew", id: 9 },
  { firstName: "Sophia", id: 10 },
];

let body = {
  marginTop: "48px",
  width: "100%",
  height: "100%",
  right: 0,
  background: "yellow",
  // justifyItems: "center",
  bgcolor: "background.default",
};
export default function () {
  const [theme, setTheme] = useState(lightMode);
  const [click, setClick] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filterSearch, setFilterSearch] = useState([]);

  function handleToggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }
  console.log(users);
  useEffect(() => {
    setTheme(click ? darkMode : lightMode);
  }, [click]);

  function switchMode() {
    setClick(!click);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component={"nav"} sx={{}}>
        <Header mode={theme}>
          <SearchLive users={users} setFilterSearch={setFilterSearch} />
          <IconButton onClick={switchMode}>
            {!click ? <DarkModeIcon /> : <WbSunnyIcon />}
          </IconButton>
          <AccountUser />
        </Header>
      </Box>
      {/* // Sidebar */}
      <Box
        component={"header"}
        position={"fixed"}
        sx={{
          marginTop: "48px",
          height: "100vh",
          width: "20%",
          float: "left",
        }}
      >
        <TabBar />
      </Box>
      {/* Body part */}
      {/* <Box
        component={"main"}
        position={"sticky"}
        sx={{
          flexGrow: "1",
          width: "80%",
          float: "right",
          marginTop: "48px",
          justifyItems: "center",
        }}
      >
        Hello
      </Box> */}
      <Outlet />
    </ThemeProvider>
  );
}
