"use client";

import { Person } from "@mui/icons-material";
import {
  Toolbar,
  Typography,
  Switch,
  IconButton,
  CircularProgress,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Suspense, useState } from "react";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import dynamic from "next/dynamic";

const SideMenu = dynamic(() => import("../SideMenu/SideMenu"), {
  loading: () => <p>Loading...</p>,
});

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = ({ toggleTheme, mode }: any) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (open: boolean) => {
    setMenuOpen(open);
  };

  return (
    <>
      <AppBar position="fixed" open={menuOpen}>
        <Toolbar>
          <IconButton
            data-testid="side-menu-open-button"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleMenu(true)}
            sx={[
              {
                mr: 2,
              },
              menuOpen && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Uni-Dash
          </Typography>
          <Link href="/user" passHref>
            <IconButton
              aria-label="user profile"
              style={{ marginRight: "0.5rem" }}
            >
              <Person />
            </IconButton>
          </Link>
          <LightModeIcon />
          <Switch checked={mode === "dark"} onChange={toggleTheme} />
          <DarkModeIcon />
        </Toolbar>
      </AppBar>

      <Suspense fallback={<CircularProgress />}>
        <SideMenu open={menuOpen} toggleMenu={toggleMenu} />
      </Suspense>
    </>
  );
};

export default Header;
