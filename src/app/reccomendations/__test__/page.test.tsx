import { render, screen } from "@testing-library/react";
import ReccomendationsPage from "../page";
import "@testing-library/jest-dom";

jest.mock("@mui/icons-material/Inventory", () => {
    const InventoryIconMock = () => <div data-testid="inventory-icon" />;
    InventoryIconMock.displayName = "inventory-icon";
    return InventoryIconMock;
  });

describe("ReccomendationsPage", () => {
  it("renders the recommendations page correctly", async () => {
    render(<ReccomendationsPage />);

    expect(screen.getByText("Reccomendations")).toBeInTheDocument();

    expect(screen.getByTestId("inventory-icon")).toBeInTheDocument();

    expect(screen.getByText("Coming soon...")).toBeInTheDocument();

    expect(
      screen.getByText(
        "In the future this will allow a user to view recommendated data based on personalised data."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "This will include recommended courses, events and clubs based on your interests and timetable schedule."
      )
    ).toBeInTheDocument();
  });
});
