import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeProviderClient from "../ThemeProviderClient";
import { getCookie, setCookie } from "../../../utils/cookieUtils";
import "@testing-library/jest-dom";

jest.mock("../../../utils/cookieUtils", () => ({
  getCookie: jest.fn(),
  setCookie: jest.fn(),
}));

jest.mock("../../Header/Header", () => ({
  __esModule: true,
  default: ({ toggleTheme, mode }: any) => (
    <div data-testid="header">
      <button onClick={toggleTheme}>Toggle Theme</button>
      <p>Current Mode: {mode}</p>
    </div>
  ),
}));

jest.mock("../../SimpleBreadcrumbs/SimpleBreadcrumbs", () => ({
  __esModule: true,
  default: () => <div data-testid="breadcrumbs">Breadcrumbs</div>,
}));

describe("ThemeProviderClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the theme provider with light mode by default", () => {
    (getCookie as jest.Mock).mockReturnValue("light");

    render(
      <ThemeProviderClient initialTheme="light">
        <div>Content</div>
      </ThemeProviderClient>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
    expect(screen.getByText("Current Mode: light")).toBeInTheDocument();
  });

  it("toggles the theme between light and dark mode", () => {
    (getCookie as jest.Mock).mockReturnValue("light");

    render(
      <ThemeProviderClient initialTheme="light">
        <div>Content</div>
      </ThemeProviderClient>
    );

    const toggleButton = screen.getByText("Toggle Theme");

    // switch to dark mode
    fireEvent.click(toggleButton);
    expect(screen.getByText("Current Mode: dark")).toBeInTheDocument();
    expect(setCookie).toHaveBeenCalledWith("theme", "dark", 1);

    // switch back to light mode
    fireEvent.click(toggleButton);
    expect(screen.getByText("Current Mode: light")).toBeInTheDocument();
    expect(setCookie).toHaveBeenCalledWith("theme", "light", 1);
  });

  it("loads the saved theme from the cookie", () => {
    (getCookie as jest.Mock).mockReturnValue("dark");

    render(
      <ThemeProviderClient initialTheme="light">
        <div>Content</div>
      </ThemeProviderClient>
    );

    expect(screen.getByText("Current Mode: dark")).toBeInTheDocument();
  });
});
