import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";
import { MockedProvider } from "@apollo/client/testing";

jest.mock("../../SideMenu/SideMenu", () => {
  const SideMenuMock = () => <div>SideMenu Mock</div>;
  SideMenuMock.displayName = "SideMenuMock";
  return SideMenuMock;
});
describe("Header Component", () => {
  const toggleThemeMock = jest.fn();

  it("renders the Header correctly", () => {
    render(
      <MockedProvider>
        <Header toggleTheme={toggleThemeMock} mode="light" />
      </MockedProvider>
    );

    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
    expect(screen.getByText("Uni-Dash")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /user profile/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("calls toggleTheme when the Switch is toggled", () => {
    render(
      <MockedProvider>
        <Header toggleTheme={toggleThemeMock} mode="light" />
      </MockedProvider>
    );

    const switchElement = screen.getByRole("checkbox");
    fireEvent.click(switchElement);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });

  it("opens the SideMenu when the menu IconButton is clicked", async () => {
    render(
      <MockedProvider>
        <Header toggleTheme={toggleThemeMock} mode="light" />
      </MockedProvider>
    );

    const menuButton = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText("SideMenu Mock")).toBeInTheDocument();
    });
  });
});
