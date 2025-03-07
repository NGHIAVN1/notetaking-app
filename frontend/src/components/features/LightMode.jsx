import { createTheme } from "@mui/material/styles";
export const lightMode = createTheme({
  palette: {
    mode: "light",
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#fff",
    },
  },
});
