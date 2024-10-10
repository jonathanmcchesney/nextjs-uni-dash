import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Programs from "../Programs";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const mockPrograms = [
  {
    id: "program-1",
    name: "Bachelor of Science in Physics",
    courses: [
      {
        id: "course-1",
        title: "Quantum Mechanics",
        description: "An introduction to quantum mechanics.",
        credits: 4,
      },
      {
        id: "course-2",
        title: "Thermodynamics",
        description: "Study of energy and heat transfer.",
        credits: 3,
      },
    ],
  },
  {
    id: "program-2",
    name: "Bachelor of Arts in Literature",
    courses: [
      {
        id: "course-3",
        title: "Shakespearean Literature",
        description: "A deep dive into the works of William Shakespeare.",
        credits: 3,
      },
      {
        id: "course-4",
        title: "Modern American Fiction",
        description: "Exploring contemporary American fiction.",
        credits: 3,
      },
    ],
  },
];

const renderWithTheme = (component: JSX.Element) => {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("Programs Component", () => {
  it("renders the list of programs and courses", () => {
    renderWithTheme(<Programs programs={mockPrograms} />);

    // assert program titles
    expect(
      screen.getByTestId("program-name-program-1").firstChild
    ).toMatchInlineSnapshot(`Bachelor of Science in Physics`);
    expect(
      screen.getByTestId("program-name-program-2").firstChild
    ).toMatchInlineSnapshot(`Bachelor of Arts in Literature`);

    // assert course titles
    expect(
      screen.getByTestId("program-program-1-course-title-course-1").firstChild
        ?.firstChild
    ).toMatchInlineSnapshot(`Quantum Mechanics`);
    expect(
      screen.getByTestId("program-program-1-course-title-course-2").firstChild
        ?.firstChild
    ).toMatchInlineSnapshot(`Thermodynamics`);
    expect(
      screen.getByTestId("program-program-2-course-title-course-3").firstChild
        ?.firstChild
    ).toMatchInlineSnapshot(`Shakespearean Literature`);
    expect(
      screen.getByTestId("program-program-2-course-title-course-4").firstChild
        ?.firstChild
    ).toMatchInlineSnapshot(`Modern American Fiction`);
  });

  it("opens the modal when a course is clicked and displays course details", () => {
    renderWithTheme(<Programs programs={mockPrograms} />);

    // Click on the first course - Quantum Mechanics
    fireEvent.click(
      screen.getByTestId("program-program-1-course-title-course-1")
    );

    // Check if the modal opens and displays the correct course details
    expect(
      screen.getByTestId("modal-course-title-course-1").firstChild
    ).toMatchInlineSnapshot(`Quantum Mechanics`);
    expect(
      screen.getByText("An introduction to quantum mechanics.")
    ).toBeInTheDocument();
    expect(screen.getByText("Credits")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("closes the modal when the 'Close' button is clicked", () => {
    renderWithTheme(<Programs programs={mockPrograms} />);

    // Click on the first course - Quantum Mechanics
    fireEvent.click(
      screen.getByTestId("program-program-1-course-title-course-1")
    );
    expect(
      screen.getByTestId("modal-course-title-course-1").firstChild
    ).toMatchInlineSnapshot(`Quantum Mechanics`);

    fireEvent.click(screen.getByText("Close"));

    // The modal content should no longer be visible
    expect(
      screen.queryByTestId("modal-course-title-course-1")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("An introduction to quantum mechanics.")
    ).not.toBeInTheDocument();
  });
});
