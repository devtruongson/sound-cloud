"use client";

import { themeDark, themeLight } from "@/lib/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";

interface IProps {
    children: React.ReactNode;
}
export default function ProviderTheme({ children }: IProps) {
    const isDarkMode = localStorage.getItem("theme")
        ? JSON.parse(localStorage.getItem("theme") || "false")
        : (() => {
              localStorage.setItem("theme", JSON.stringify(false));
              return false;
          })();
    const theme = isDarkMode ? themeDark : themeLight;

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
