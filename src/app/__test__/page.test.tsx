import { render, screen } from "@testing-library/react";
import HomePage from "../page";
import "@testing-library/jest-dom";

jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;

  MockLink.displayName = "MockNextLink";

  return MockLink;
});

describe("HomePage", () => {
  it("renders the page heading and description", () => {
    render(<HomePage />);

    expect(
      screen.getByText("Welcome to Your University Dashboard")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Your one-stop platform to manage your university life—track your progress, stay organized, and access helpful resources."
      )
    ).toBeInTheDocument();
  });

  it("renders all the cards with correct titles and descriptions", () => {
    render(<HomePage />);

    const cardTitles = [
      "University Profile",
      "Onboarding checklist",
      "Interactive Timetable",
      "User Profile",
      "Campus Map",
      "Mental Health Resources",
      "Universities overview",
      "GraphQL Playground",
    ];

    cardTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("renders the buttons with the correct href links", () => {
    render(<HomePage />);

    const buttonLinks = [
      { text: "Go to University Profile", link: "/enrolment" },
      { text: "Go to Onboarding checklist", link: "/onboarding" },
      { text: "Go to Interactive Timetable", link: "/timetable" },
      { text: "Go to User Profile", link: "/user" },
      { text: "Go to Campus Map", link: "/campus" },
      { text: "Go to Mental Health Resources", link: "/health" },
      { text: "Go to Universities overview", link: "/university" },
      { text: "Go to GraphQL Playground", link: "/api/graphql" },
    ];

    buttonLinks.forEach(({ text, link }) => {
      const button = screen.getByText(text);

      expect(button.closest("a")).toHaveAttribute("href", link);
    });
  });
});
