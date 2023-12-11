import { createTheme } from "@mui/material";

export const themeDark = createTheme({
    palette: {
        mode: "dark",
        background: {
            paper: "#212121 !important",
            default: "#212121 !important",
        },
    },
});

export const themeLight = createTheme({
    palette: {
        mode: "light",
        background: {
            paper: "#fff !important",
            default: "#fff !important",
        },
    },
});

export const themeLightDefault = createTheme({
    palette: {
        mode: "light",
    },
});
