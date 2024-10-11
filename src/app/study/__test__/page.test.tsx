import { render, screen } from "@testing-library/react";
import StudyPage from "../page";
import "@testing-library/jest-dom";

jest.mock("@mui/icons-material/School", () => {
  const SchoolIconMock = () => <div data-testid="school-icon" />;
  SchoolIconMock.displayName = "school-icon";
  return SchoolIconMock;
});

describe("StudyPage", () => {
  it("renders the study page correctly", async () => {
    render(<StudyPage />);

    expect(screen.getByText("Study and collaboration")).toBeInTheDocument();

    expect(screen.getByTestId("school-icon")).toBeInTheDocument();

    expect(screen.getByText("Coming soon...")).toBeInTheDocument();

    expect(
      screen.getByText(
        "In the future this will allow a user to can track their study progress and collaborate with peers."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "You can schedule group study sessions, with reminders and integration with the timetable, track homework, assignments and deadlines."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Finally you will be able to form study groups, share notes and chat with peers."
      )
    ).toBeInTheDocument();
  });
});
