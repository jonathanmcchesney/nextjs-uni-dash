"use client";

import { capitaliseFirstLetter } from "@/utils/stringUtils";
import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SimpleBreadcrumbs() {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
      <Link color="inherit" href="/">
        Home
      </Link>
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const href = `/${pathnames.slice(0, index + 1).join("/")}`;
        const formattedText = capitaliseFirstLetter(value);

        return isLast ? (
          <Typography key={formattedText} color="text.primary">
            {formattedText}
          </Typography>
        ) : (
          <Link key={formattedText} color="inherit" href={href}>
            {formattedText}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
