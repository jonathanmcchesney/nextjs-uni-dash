import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MockedProvider } from "@apollo/client/testing";
import { createTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import SimpleBreadcrumbs from "../SimpleBreadcrumbs";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("SimpleBreadcrumbs Component", () => {
  const theme = createTheme({
    palette: {
      background: {
        paper: "#fff",
      },
    },
  });

  it("renders breadcrumbs for the home route", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    render(
      <MockedProvider>
        <ThemeProvider theme={theme}>
          <SimpleBreadcrumbs />
        </ThemeProvider>
      </MockedProvider>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders breadcrumbs for a nested route", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard/settings");

    render(
      <MockedProvider>
        <ThemeProvider theme={theme}>
          <SimpleBreadcrumbs />
        </ThemeProvider>
      </MockedProvider>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders links correctly except for the last breadcrumb", () => {
    (usePathname as jest.Mock).mockReturnValue("/profile/edit");

    render(
      <MockedProvider>
        <ThemeProvider theme={theme}>
          <SimpleBreadcrumbs />
        </ThemeProvider>
      </MockedProvider>
    );

    const homeLink = screen.getByText("Home");
    const profileLink = screen.getByText("Profile");
    const editText = screen.getByText("Edit");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(profileLink).toHaveAttribute("href", "/profile");
    expect(editText).toBeInTheDocument();
  });
});
