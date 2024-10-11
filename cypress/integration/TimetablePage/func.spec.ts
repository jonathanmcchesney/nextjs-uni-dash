describe("Timetable Drag-and-Drop Functionality", () => {
  beforeEach(() => {
    // Visit the page where the timetable component is located
    cy.visit("/timetable"); // Adjust the URL based on your app route
  });

  it("should drag a class to a new time slot and update the schedule", () => {
    // Select the item to drag
    const dataTransfer = new DataTransfer();
    cy.get('[data-testid="droppable-timeslot-monday-0"]') // Initial slot of Math 101
      .contains("Math 101") // Ensure the timetable loads and contains Math 101
      .trigger("dragstart", { dataTransfer });

    // Drag it to the new time slot
    cy.get('[data-testid="droppable-timeslot-monday-2"]') // New target slot
      .trigger("dragover", { dataTransfer }) // Simulate dragover on the target
      .trigger("drop", { dataTransfer }); // Drop the item into the target

    // Verify that the event was moved to the new time slot
    cy.get('[data-testid="droppable-timeslot-monday-2"]').contains("Math 101");
    cy.contains("11:00 AM - 12:00 PM").should("be.visible");
  });
});
