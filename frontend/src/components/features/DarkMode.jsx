import { createTheme } from "@mui/material/styles";
const darkMode = createTheme({
  palette: {
    mode: "dark",
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "#121212",
      default: "#121212",
    },
  },
});

const lightMode = createTheme({
  palette: {
    mode: "light",
    common: {
      black: "#000",
      white: "#fff",
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      color: "blueviolet",
    },

    background: {
      paper: "#fff",
      default: "#87CEEB",
    },
  },
});
export { lightMode, darkMode };
