"use client";

import { capitaliseFirstLetter } from "@/utils/stringUtils";
import { useTheme } from "@mui/material/styles";
import { Breadcrumbs, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SimpleBreadcrumbs() {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter(Boolean);
  const theme = useTheme();

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        position: "fixed",
        top: "4rem",
        left: 0,
        width: "100%",
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        zIndex: 1000,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <MuiLink
        component={Link}
        href="/"
        underline="hover"
        color="inherit"
        sx={{
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        Home
      </MuiLink>

      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const href = `/${pathnames.slice(0, index + 1).join("/")}`;
        const formattedText = capitaliseFirstLetter(value);

        return isLast ? (
          <Typography key={formattedText} color="text.primary">
            {formattedText}
          </Typography>
        ) : (
          <MuiLink
            component={Link}
            key={formattedText}
            href={href}
            underline="hover"
            color="inherit"
            sx={{
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {formattedText}
          </MuiLink>
        );
      })}
    </Breadcrumbs>
  );
}
