import { render, screen } from "@testing-library/react";
import TimetablePage from "../page";
import "@testing-library/jest-dom";

jest.mock("../../../components/Timetable/Timetable", () => {
  const TimetableMock = () => <div data-testid="timetable-component">Timetable Component</div>;
  TimetableMock.displayName = "Timetable Component";
  return TimetableMock;
});

describe("TimetablePage", () => {
  it("renders the timetable page correctly", () => {
    render(<TimetablePage />);

    expect(screen.getByText("My timetable")).toBeInTheDocument();

    expect(screen.getByTestId("timetable-component")).toBeInTheDocument();
  });
});
