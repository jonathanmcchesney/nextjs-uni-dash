"use client";

import React, { useEffect, useState } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
  PaletteMode,
  Box,
} from "@mui/material";
import Header from "../Header/Header";
import styles from "./ThemeProviderClient.module.scss";
import { getCookie, setCookie } from "@/utils/cookieUtils";
import SimpleBreadcrumbs from "../SimpleBreadcrumbs/SimpleBreadcrumbs";
// import { deepPurple, grey, purple } from "@mui/material/colors";

export default function ThemeProviderClient({
  initialTheme = "light",
  children,
}: any) {
  const [mode, setMode] = useState(initialTheme);

  useEffect(() => {
    const savedMode = getCookie("theme") || "light";
    setMode(savedMode as PaletteMode);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode as PaletteMode);
    setCookie("theme", newMode, 1);
  };

  const theme = createTheme({
    palette: {
      mode: mode as PaletteMode,
      // ...(mode === "light" && {
      //   primary: {
      //     main: purple[500],
      //   },
      //   secondary: {
      //     main: deepPurple[500],
      //   },
      // }),
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.header}>
        <Header toggleTheme={toggleTheme} mode={mode} />
      </div>
      <SimpleBreadcrumbs />
      <Box className={styles.content} sx={{ padding: 8 }}>
        {children}
      </Box>
    </MuiThemeProvider>
  );
}
