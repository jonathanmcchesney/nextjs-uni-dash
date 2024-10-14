import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import {
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import HandshakeIcon from "@mui/icons-material/Handshake";
import InventoryIcon from "@mui/icons-material/Inventory";
import SchoolIcon from "@mui/icons-material/School";
import MapIcon from "@mui/icons-material/Map";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ScheduleIcon from "@mui/icons-material/Schedule";
import GroupsIcon from "@mui/icons-material/Groups";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import BookIcon from "@mui/icons-material/Book";

const pages = [
  { name: "Home", path: "/", icon: <HomeIcon /> },
  { name: "Onboarding", path: "/onboarding", icon: <HandshakeIcon /> },
  { name: "My Enrolment", path: "/enrolment", icon: <SchoolIcon /> },
  { name: "My Programs", path: "/programs", icon: <BookIcon /> },
  { name: "Campus", path: "/campus", icon: <MapIcon /> },
  { name: "Timetable", path: "/timetable", icon: <ScheduleIcon /> },
  { name: "Study", path: "/study", icon: <GroupsIcon /> },
  { name: "Universities", path: "/university", icon: <SchoolIcon /> },
  {
    name: "Reccomendations",
    path: "/reccomendations",
    icon: <InventoryIcon />,
  },
  { name: "Health", path: "/health", icon: <HealthAndSafetyIcon /> },
];

const additionalPages = [
  { name: "GraphQL", path: "/api/graphql", icon: <OpenInNewIcon /> },
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SideMenu = ({
  open,
  toggleMenu,
}: {
  open: boolean;
  toggleMenu: (open: boolean) => void;
}) => {
  const drawerWidth = 240;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton
          data-testid="side-menu-close-button"
          onClick={() => toggleMenu(false)}
        >
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {pages.map(({ name, path, icon }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton
              data-testid={`side-menu-link-button-${name.toLowerCase()}`}
              component={Link}
              href={path}
              onClick={() => toggleMenu(false)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* normally in production we would not expose the graphql playground */}
      {process.env.NODE_ENV !== "production" && (
        <List>
          {additionalPages.map(({ name, path, icon }) => (
            <ListItem key={name} disablePadding>
              <ListItemButton
                component={Link}
                data-testid={`side-menu-link-button-${name.toLowerCase()}`}
                href={path}
                onClick={() => toggleMenu(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Drawer>
  );
};

export default SideMenu;
