import { render, screen, fireEvent } from "@testing-library/react";
import SideMenu from "../SideMenu";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("SideMenu Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders menu items correctly", () => {
    const toggleMenu = jest.fn();
    render(<SideMenu open={true} toggleMenu={toggleMenu} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Onboarding")).toBeInTheDocument();
    expect(screen.getByText("My Enrolment")).toBeInTheDocument();
    expect(screen.getByText("My Programs")).toBeInTheDocument();
    expect(screen.getByText("Campus")).toBeInTheDocument();
    expect(screen.getByText("Timetable")).toBeInTheDocument();
    expect(screen.getByText("Study")).toBeInTheDocument();
    expect(screen.getByText("Universities")).toBeInTheDocument();
    expect(screen.getByText("Reccomendations")).toBeInTheDocument();
    expect(screen.getByText("Health")).toBeInTheDocument();
  });

  it("closes the menu when clicking the close button", () => {
    const toggleMenu = jest.fn();
    render(<SideMenu open={true} toggleMenu={toggleMenu} />);

    const closeButton = screen.getByTestId("side-menu-close-button");
    fireEvent.click(closeButton);

    expect(toggleMenu).toHaveBeenCalledWith(false);
  });
  it("navigates to the correct route when a menu item is clicked for home", () => {
    const toggleMenu = jest.fn();
    render(<SideMenu open={true} toggleMenu={toggleMenu} />);

    const homeButton = screen.getByTestId("side-menu-link-button-home");
    fireEvent.click(homeButton);

    expect(homeButton).toHaveAttribute("href", "/");
    expect(toggleMenu).toHaveBeenCalledWith(false);
  });
  it("navigates to the correct route when a menu item is clicked for onboarding", () => {
    const toggleMenu = jest.fn();
    render(<SideMenu open={true} toggleMenu={toggleMenu} />);

    const homeButton = screen.getByTestId("side-menu-link-button-onboarding");
    fireEvent.click(homeButton);

    expect(homeButton).toHaveAttribute("href", "/onboarding");
    expect(toggleMenu).toHaveBeenCalledWith(false);
  });
  it("navigates to the correct route when a menu item is clicked for graphql", () => {
    const toggleMenu = jest.fn();
    render(<SideMenu open={true} toggleMenu={toggleMenu} />);

    const homeButton = screen.getByTestId("side-menu-link-button-graphql");
    fireEvent.click(homeButton);

    expect(homeButton).toHaveAttribute("href", "/api/graphql");
    expect(toggleMenu).toHaveBeenCalledWith(false);
  });
});
