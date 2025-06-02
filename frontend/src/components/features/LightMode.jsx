import { createTheme } from "@mui/material/styles";
export const lightMode = createTheme({
  palette: {
    mode: "light",
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "#87CEEB",
      default: "#F0F8FF",
    },
  },
});
