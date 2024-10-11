import { render, screen } from "@testing-library/react";
import OnboardingPage from "../page";
import "@testing-library/jest-dom";

jest.mock("../../../utils/constants", () => ({
  currentlyLoggedInUserId: "user123",
}));

jest.mock("../../../components/OnboardingChecklist/OnboardingChecklist", () => {
    const OnboardingChecklistMock = () => <div>Mocked OnboardingChecklist</div>;
    OnboardingChecklistMock.displayName = "OnboardingChecklistMock";
    return OnboardingChecklistMock;
  });

describe("OnboardingPage", () => {
  it("renders the onboarding resources and checklist correctly", async () => {
    render(<OnboardingPage />);

    expect(screen.getByText("Onboarding resources")).toBeInTheDocument();

    expect(screen.getByText("Onboarding checklist")).toBeInTheDocument();

    expect(screen.getByText("Mocked OnboardingChecklist")).toBeInTheDocument();
  });
});
