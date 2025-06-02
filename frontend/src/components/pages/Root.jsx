import { ThemeProvider } from "@mui/material/styles";
import { Outlet, useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import TabBar from "../features/TabBar.jsx";
import Box from "@mui/material/Box";
import Header from "../features/Navbar.jsx";
import { useState, useEffect, useContext } from "react";
import { lightMode, darkMode } from "../features/DarkMode.jsx";
import { CssBaseline, Grid2, IconButton } from "@mui/material";
import SearchLive from "../features/SearchLive.jsx";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccountUser from "../../common/AcountUser.jsx";
import { isAuth } from "../../util/auth.js";
import auth from "../../../api/auth.js";
import systemNotes from "../../../api/notes.js";
import DataContext from "../../context/DataProvider.jsx";

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
export default function Root({ protectRoute }) {
  const [term, setTerm] = useState("");
  const [apiNotes, setApiNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState([]);
  const [theme, setTheme] = useState(lightMode);
  const [click, setClick] = useState(false);
  const [search, setSearch] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loadingCollection, setLoadingCollection] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    systemNotes
      .getNotes()
      .then((data) => {
        console.log(data);
        setApiNotes(data);
        setFilterNotes(data);
        return data;
      })
      .catch((err) => {
        return err;
      });
  }, []);
  const setDark = localStorage.setItem("theme", "dark");
  const setLight = localStorage.setItem("theme", "light");
  const getTheme = localStorage.getItem("theme");

  // Authentication User
  console.log(loadingCollection);
  useEffect(() => {
    if (!isAuth()) {
      navigate("/login");
    }
  }, []);

  // Empty dependency array to run only once on component mount
  function handleToggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }
  console.log(filterNotes);
  // useEffect(() => {
  //   click
  //     ? localStorage.setItem("theme", "dark")
  //     : localStorage.setItem("theme", "light");
  //   setTheme(localStorage.getItem("theme") == "dark" ? darkMode : lightMode);
  // }, []);

  function switchMode() {
    setClick(!click);
  }

  const dataResult = () => {
    term.length === 0 ? filterNotes : undefined;
  };
  const result = dataResult;
  console.log(term);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component={"nav"} sx={{}}>
        <Header mode={theme}>
          <SearchLive
            term={term}
            setTerm={setTerm}
            apiNotes={apiNotes}
            setFilterNotes={setFilterNotes}
          ></SearchLive>
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
        <TabBar setLoadingCollection={setLoadingCollection} theme={theme} />
      </Box>

      <DataContext.Provider
        value={{
          filterNotes: filterNotes,
          term: term,
          apiNotes: apiNotes,
          loadingCollection: loadingCollection,
        }}
      >
        <Outlet term={term} setTerm={setTerm} />
      </DataContext.Provider>
    </ThemeProvider>
  );
}
