import { keyCodes } from "./utils/keyCodes";

describe("Timetable", () => {
  beforeEach(() => {
    cy.visit("/timetable");

    cy.intercept("POST", "/api/graphql", (req) => {
      if (req.body.operationName === "getTimetable") {
        req.reply({
          data: {
            getTimetable: [
              {
                id: "class-1",
                name: "Math 101",
                startTime: "9:00 AM",
                endTime: "10:00 AM",
                day: "Monday",
                category: "class",
                __typename: "Class",
              },
              {
                id: "class-2",
                name: "History 202",
                startTime: "10:00 AM",
                endTime: "11:00 AM",
                day: "Tuesday",
                category: "class",
                __typename: "Class",
              },
              {
                id: "class-3",
                name: "Physics 301",
                startTime: "11:00 AM",
                endTime: "12:00 PM",
                day: "Monday",
                category: "class",
                __typename: "Class",
              },
            ],
          },
        });
      }
    });
  });

  it("should move a class to a new time slot and update the timetable", () => {
    // login
    const email = "john@example.com";
    cy.get('[data-testid="login-email"]').type(email);
    cy.get('[data-testid="login-pass"]').type(email);
    cy.get('[data-testid="login-button"]').click();

    // auto navigation to the home page, then navigate to the timetable page via the side menu
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    cy.get('[data-testid="home-title"]').should(
      "contain",
      "Welcome to Your University Dashboard"
    );
    cy.get('[data-testid="side-menu-open-button"]').click();
    cy.get('[data-testid="side-menu-link-button-timetable"]')
      .should("contain", "Timetable")
      .click({ force: true });

    // assert Monday slot 1: Math 101
    cy.get('[data-testid="droppable-timeslot-monday-0"]').should(
      "contain",
      "Math 101"
    );
    cy.get('[data-testid="droppable-timeslot-tuesday-0"]').should(
      "not.contain",
      "Math 101"
    );

    // move Monday slot 1: Math 101 -> Tuesday slot 1: Math 101
    cy.get('[data-testid="draggable-card-class-1-index"]')
      .focus()
      .trigger("keydown", { keyCode: keyCodes.space, force: true })
      .trigger("keydown", { keyCode: keyCodes.rightArrow, force: true })
      .trigger("keydown", { keyCode: keyCodes.space, force: true });

    // assert Tuesday slot 1: Math 101
    cy.get('[data-testid="droppable-timeslot-monday-0"]').should(
      "not.contain",
      "Math 101"
    );
    cy.get('[data-testid="droppable-timeslot-tuesday-0"]').should(
      "contain",
      "Math 101"
    );
  });
});
