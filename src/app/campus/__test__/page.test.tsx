import { render, screen } from "@testing-library/react";
import CampusPage from "../page";
import "@testing-library/jest-dom";

jest.mock("../../../components/MockCampusMap/MockCampusMap", () => {
  const MockCampusMapMock = () => <div>MockCampusMap Component</div>;
  MockCampusMapMock.displayName = "MockCampusMap Component";
  return MockCampusMapMock;
});

describe("CampusPage", () => {
  it("renders the welcome message and MockCampusMap component", () => {
    render(<CampusPage />);

    expect(screen.getByText("Welcome to the campus!")).toBeInTheDocument();

    expect(screen.getByText("MockCampusMap Component")).toBeInTheDocument();
  });
});
