import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MockCampusMap from "../MockCampusMap";
import "@testing-library/jest-dom";

describe("MockCampusMap", () => {
  it("renders the map with all locations and the user location", () => {
    render(<MockCampusMap />);

    expect(screen.getByTestId("location-a")).toBeInTheDocument();
    expect(screen.getByTestId("location-b")).toBeInTheDocument();
    expect(screen.getByTestId("location-c")).toBeInTheDocument();
    expect(screen.getByTestId("user-location")).toBeInTheDocument();
  });

  it("shows location details when a location is clicked", () => {
    render(<MockCampusMap />);

    fireEvent.click(screen.getByTestId("location-a"));

    expect(
      screen.getByTestId("class-location-a").firstChild
    ).toMatchInlineSnapshot(`A`);
    expect(screen.getByTestId("location-a").firstChild).toMatchInlineSnapshot(
      `A`
    );
    expect(
      screen.getByText(
        "Primary building for physics, mathematics and computer science. Your upcoming Math 101 class takes place here."
      )
    ).toBeInTheDocument();
  });

  it("shows walking directions when 'Get Walking Directions' is clicked", async () => {
    render(<MockCampusMap />);

    fireEvent.click(screen.getByTestId("location-a"));

    const walkingButton = screen.getByRole("button", {
      name: /Get Walking Directions/i,
    });
    fireEvent.click(walkingButton);

    await waitFor(() => {
      expect(
        screen.getByText("Estimated walking time: 5 minutes")
      ).toBeInTheDocument();
    });
  });

  it("shows correct location details for user location", () => {
    render(<MockCampusMap />);

    fireEvent.click(screen.getByTestId("user-location"));

    expect(screen.getByText("You. You are here")).toBeInTheDocument();
    expect(
      screen.getByText("This is your current location.")
    ).toBeInTheDocument();
  });
});
