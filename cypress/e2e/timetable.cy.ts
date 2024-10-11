describe("Timetable", () => {
  beforeEach(() => {
    cy.visit("/timetable");
  });

  it("should drag a class to a new time slot and update the schedule", () => {
    cy.get('[data-testid="droppable-timeslot-monday-0"]').should(
      "contain",
      "Math 101"
    );
  });
});
