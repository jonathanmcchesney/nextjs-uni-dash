"use client";

import { Person } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Switch, IconButton } from "@mui/material";
import Link from "next/link";

export default function Header({ toggleTheme, mode }: any) {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          NextJS Product Recommendations Demo
        </Typography>
        <Link href="/user" passHref>
          <IconButton aria-label="delete">
            <Person />
          </IconButton>
        </Link>
        <Switch checked={mode === "dark"} onChange={toggleTheme} />
      </Toolbar>
    </AppBar>
  );
}
